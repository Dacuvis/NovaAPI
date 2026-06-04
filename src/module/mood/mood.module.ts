import { pool } from "../../database/database";
import { Mood, MoodQuery } from "./mood.types";

export const moodModule = {
  async create(data: Mood) {
    const { mood, recomendation } = data;
    const [result] = await pool.query(
      `INSERT INTO mood (mood, recomendation) VALUES (?, ?)`,
      [mood, recomendation]
    );
    return result;
  },

  async getAll() {
    const [result] = await pool.query(`SELECT * FROM mood`);
    return result;
  },

  async GetByMood(query: MoodQuery) {
    const sql = `SELECT * FROM mood WHERE mood = ?`;
    const [result] = await pool.query(sql, [query.mood]);
    return result;
  },
};
