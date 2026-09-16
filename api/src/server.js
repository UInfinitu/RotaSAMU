import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "@fastify/type-provider-zod";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { UsuarioSchema } from "../prisma/generated/zod/index.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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
  "/usuarios",
  {
    schema: {
      body: UsuarioSchema.omit({ id: true, criadoEm: true, status: true }),
    },
  },
  async (request, reply) => {
    const usuario = await prisma.usuario.create({ data: request.body });
    return usuario;
  },
);

app.get("/usuarios", async (request, reply) => {
  return prisma.usuario.findMany();
});

app.listen({ port: 3000, host: "0.0.0.0" });
