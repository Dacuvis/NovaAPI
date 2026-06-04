import { Elysia, t } from "elysia";
import { moodController } from "./mood.controller";

export const moodRoute = new Elysia()
  .get(
    "/mood",
    async ({ query }) => {
      return moodController.getByMood(query);
    },
    {
      query: t.Object({
        mood: t.String(),
      }),
    }
  )

  .post(
    "/mood",
    async ({ body }) => {
      return moodController.create(body);
    },
    {
      body: t.Object({
        mood: t.String(),
        recomendation: t.String(),
      }),
    }
  );
