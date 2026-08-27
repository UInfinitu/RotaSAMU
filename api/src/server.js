import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "@fastify/type-provider-zod";
import { z } from "zod/v4";

const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "RotaSAMU API",
      description: "Documentação da API do sistema RotaSAMU",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.post(
  "/users",
  {
    schema: {
      body: z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    },
  },
  async (request, reply) => {
    return { received: request.body };
  },
);

app.listen({ port: 3000, host: "0.0.0.0" });
