import { pool } from "../../database/database";
import { Mood, MoodQuery } from "./mood.types";
import { loadluaFile } from "../../utils/loader";
import { lua, to_luastring } from "fengari";

export const moodModule = {
  async create(data: Mood) {
    const { mood, rating, recomendation } = data;
    const [result] = await pool.query(
      `INSERT INTO mood (mood, rating, recomendation) VALUES (?, ?, ?)`,
      [mood, rating, recomendation]
    );
    return result;
  },

  // async getAll() {
  //   const [result] = await pool.query(`SELECT * FROM mood`);
  //   return result;
  // },

  async GetByMood(query: MoodQuery) {
    let sql = `SELECT * FROM mood`;
    let params: any[] = []
    if(query.mood) {
      sql += ` WHERE mood = ?`;
      params.push(query.mood);
    }
    const [result] = await pool.query(sql, params);
    return result;
  },

async GetByFilter() {
    const filter = await loadluaFile("./src/scripts/rating.lua");
    if (!filter) {
        throw new Error("Gagal memuat file konfigurasi Lua");
    }

    
    lua.lua_getfield(filter, -1, to_luastring("minRating"));
    
    
    const rating = lua.lua_tonumber(filter, -1); 
    lua.lua_pop(filter, 1); 

    
    lua.lua_pop(filter, 1); 

    
    lua.lua_close(filter);

    console.log("Rating dari Lua:", rating);

    
    const sql = `
      SELECT *
      FROM mood
      WHERE RATING >= ? 
    `;

    const [result] = await pool.query(sql, [rating]);

    return result;
}
};
