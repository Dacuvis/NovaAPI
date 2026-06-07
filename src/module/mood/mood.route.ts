import { Elysia, t } from "elysia";
import { moodController } from "./mood.controller";
import { Auth } from "../../middleware/auth";

export const moodRoute = new Elysia()
  .get(
    "/mood",
    async ({ query }) => {
      try {
        return await moodController.getByMood(query);
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : "An error occurred",
        };
      }
    },
    {
      query: t.Object({
        mood: t.Optional(t.String()),
      }),
    }
  )

  .get("/mood/filter", async () => {
    return moodController.GetByFilter();
  })

  .post(
    "/mood",
    async ({ body, headers, set }) => {
      return moodController.create(body);
    },
    {
      body: t.Object({
        mood: t.String(),
        rating: t.Number(),
        recomendation: t.String(),
      }),
      beforeHandle: Auth,
    }
  );
