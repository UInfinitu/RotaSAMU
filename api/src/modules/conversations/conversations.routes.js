import { z } from "zod/v4";

import { show, sendMessage } from "./conversations.service.js";

export default async function conversationsRoutes(app) {
  app.get(
    "/:id",
    { schema: { params: z.object({ id: z.string().uuid() }) } },
    async (request, reply) => show(request.params.id),
  );

  app.post(
    "/:id/messages",
    {
      schema: {
        params: z.object({ id: z.string().uuid() }),
        body: z.object({ text: z.string().min(1) }),
      },
    },
    async (request, reply) => {
      const message = await sendMessage(request.params.id, request.body);
      reply.code(201);
      return message;
    },
  );
}
