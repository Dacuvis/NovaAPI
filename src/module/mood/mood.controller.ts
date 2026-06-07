import { Mood, MoodQuery } from "./mood.types";
import { moodService } from "./mood.service";

export const moodController = {
  async create(body: Mood) {
    return moodService.create(body);
  },

  // async getAll() {
  //   return moodService.getAll();
  // },

  async getByMood(query: MoodQuery) {
    return moodService.GetByMood(query);
  },

  async GetByFilter() {
    return moodService.GetByFilter();
  }
};
