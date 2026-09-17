import { z } from "zod/v4";

import { UserSchema } from "../../../prisma/generated/zod/index.ts";

import { show, create, login, logout } from "./attendants.service.js";

export default async function attendantsRoutes(app) {
  app.get(
    "/:id",
    { schema: { params: z.object({ id: z.string().uuid() }) } },
    async (request, reply) => {
      const attendant = await show(request.params.id);
      if (!attendant)
        return reply.code(404).send({ message: "Attendant not found" });
      return attendant;
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
      const attendant = await create(request.body);
      reply.code(201);
      return attendant;
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
