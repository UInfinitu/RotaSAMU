import { index } from "./notifications.service.js";

export default async function notificationsRoutes(app) {
  app.get("/", async (request, reply) => index());
}
