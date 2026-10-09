import { prisma } from "#db/prisma.js";
import {
  DEFAULT_SPEED_MULTIPLIER,
  DEFAULT_TICK_MS,
  OSRM_BASE_URL,
} from "#config/constants.js";
import {
  BadGatewayError,
  NotFoundError,
  UnprocessableEntityError,
} from "#utils/errors.js";
import { buildCumulativeDistances, positionAtDistance } from "#utils/geo.js";

export const getRoute = async ({ originLat, originLng, destLat, destLng }) => {
  const coordinatesParam = `${originLng},${originLat};${destLng},${destLat}`;
  const url = `${OSRM_BASE_URL}/${coordinatesParam}?overview=full&geometries=geojson`;

  const response = await fetch(url).catch(() => {
    throw new BadGatewayError("Routing service unavailable");
  });

  if (!response.ok) {
    throw new BadGatewayError(`OSRM responded with status ${response.status}`);
  }

  const data = await response.json();

  if (data.code !== "Ok" || !data.routes?.length) {
    throw new UnprocessableEntityError(
      "Unable to calculate a route between the given points",
    );
  }

  const route = data.routes[0];

  return {
    coordinates: route.geometry.coordinates.map(([lng, lat]) => ({
      lat,
      lng,
    })),
    distanceMeters: route.distance,
    durationSeconds: route.duration,
  };
};

export const startSimulation = async ({
  vehicleId,
  destLat,
  destLng,
  speedMultiplier = DEFAULT_SPEED_MULTIPLIER,
  tickMs = DEFAULT_TICK_MS,
  onArrive,
}) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });
  if (!vehicle) throw new NotFoundError("Vehicle not found");

  stopSimulation(vehicleId);

  const route = await getRoute({
    originLat: vehicle.latitude,
    originLng: vehicle.longitude,
    destLat,
    destLng,
  });

  const cumulativeDistances = buildCumulativeDistances(route.coordinates);
  const totalDistance = cumulativeDistances[cumulativeDistances.length - 1];

  // Simulated duration = real duration divided by the speed multiplier.
  const simulatedDurationSeconds = route.durationSeconds / speedMultiplier;

  let elapsedSeconds = 0;

  const intervalId = setInterval(async () => {
    try {
      elapsedSeconds += tickMs / 1000;

      const fraction = Math.min(elapsedSeconds / simulatedDurationSeconds, 1);
      const targetDistance = fraction * totalDistance;
      const position = positionAtDistance(
        route.coordinates,
        cumulativeDistances,
        targetDistance,
      );

      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { latitude: position.lat, longitude: position.lng },
      });

      if (fraction >= 1) {
        stopSimulation(vehicleId);
        onArrive?.();
      }
    } catch (error) {
      console.error(`Simulation for vehicle ${vehicleId} failed`, error);
      stopSimulation(vehicleId);
    }
  }, tickMs);

  activeSimulations.set(vehicleId, {
    intervalId,
    route,
    startedAt: Date.now(),
  });

  return {
    distanceMeters: route.distanceMeters,
    estimatedDurationSeconds: route.durationSeconds,
    simulatedDurationSeconds,
  };
};

export const stopSimulation = (vehicleId) => {
  const simulation = activeSimulations.get(vehicleId);
  if (simulation) {
    clearInterval(simulation.intervalId);
    activeSimulations.delete(vehicleId);
  }
};

export const isSimulating = (vehicleId) => activeSimulations.has(vehicleId);

// Private

const activeSimulations = new Map();
