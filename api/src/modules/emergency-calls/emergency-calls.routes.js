import { z } from "zod/v4";

import { EmergencyCallSchema } from "../../../prisma/generated/zod/index.ts";

import {
  listEmergencyCalls,
  findEmergencyCallById,
  getLocation,
  createEmergencyCall,
  concludeEmergencyCall,
} from "./emergency-calls.service.js";

export default async function emergencyCallsRoutes(app) {
  app.get("/", async (request, reply) => listEmergencyCalls());

  app.get(
    "/:id",
    { schema: { params: z.object({ id: z.string().uuid() }) } },
    async (request, reply) => {
      const emergencyCall = await findEmergencyCallById(request.params.id);
      if (!emergencyCall)
        return reply.code(404).send({ message: "Emergency call not found" });
      return emergencyCall;
    },
  );

  app.get("/get_location", async (request, reply) => getLocation());

  app.post(
    "/",
    {
      schema: { body: EmergencyCallSchema.omit({ id: true, createdAt: true }) },
    },
    async (request, reply) => {
      const emergencyCall = await createEmergencyCall(request.body);
      reply.code(201);
      return emergencyCall;
    },
  );

  app.patch(
    "/:id/conclude",
    { schema: { params: z.object({ id: z.string().uuid() }) } },
    async (request, reply) => {
      const emergencyCall = await concludeEmergencyCall(request.params.id);
      if (!emergencyCall)
        return reply.code(404).send({ message: "Emergency call not found" });
      return emergencyCall;
    },
  );
}
