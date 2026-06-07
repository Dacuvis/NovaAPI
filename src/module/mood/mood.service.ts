import { moodModule } from "./mood.module";
import { Mood } from "./mood.types";

export const moodService = {
  async create(data: Parameters<typeof moodModule.create>[0]) {
    const result = await moodModule.create(data);
    return result;
  },

  // async getAll() {
  //   const result = await moodModule.getAll();
  //   return result;
  // },

  async GetByMood(query: Parameters<typeof moodModule.GetByMood>[0]) {
    const result = await moodModule.GetByMood(query);
    return result;
  },

  async GetByFilter() {
    const result = await moodModule.GetByFilter();
    return result;
  }
};
