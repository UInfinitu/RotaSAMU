import { z } from "zod/v4";

import { UserSchema } from "../../../prisma/generated/zod/index.ts";

import { index, show, create, login, logout } from "./drivers.service.js";

export default async function driversRoutes(app) {
  app.get("/", async (request, reply) => index());

  app.get(
    "/:id",
    { schema: { params: z.object({ id: z.string().uuid() }) } },
    async (request, reply) => {
      const driver = await show(request.params.id);
      if (!driver) return reply.code(404).send({ message: "Driver not found" });
      return driver;
    },
  );

  app.post(
    "/",
    {
      schema: {
        body: UserSchema.omit({
          id: true,
          createdAt: true,
          role: true,
          status: true,
        }),
      },
    },
    async (request, reply) => {
      const driver = await create(request.body);
      reply.code(201);
      return driver;
    },
  );

  app.post(
    "/login",
    {
      schema: {
        body: z.object({ email: z.string().email(), password: z.string() }),
      },
    },
    async (request, reply) => login(request.body),
  );

  app.post("/logout", async (request, reply) => logout(request.params.id));
}
