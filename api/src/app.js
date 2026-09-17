import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "@fastify/type-provider-zod";

import attendantsRoutes from "./modules/attendants/attendants.routes.js";
import driversRoutes from "./modules/drivers/drivers.routes.js";
import emergencyCallsRoutes from "./modules/emergency-calls/emergency-calls.routes.js";
import conversationsRoutes from "./modules/conversations/conversations.routes.js";
import notificationsRoutes from "./modules/notifications/notifications.routes.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "RotaSAMU API",
        description: "API documentation for the RotaSAMU system",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });

  app.register(attendantsRoutes, { prefix: "/attendants" });
  app.register(driversRoutes, { prefix: "/drivers" });
  app.register(emergencyCallsRoutes, { prefix: "/emergency-calls" });
  app.register(conversationsRoutes, { prefix: "/conversations" });
  app.register(notificationsRoutes, { prefix: "/notifications" });

  return app;
}
