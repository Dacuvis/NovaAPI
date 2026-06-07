import { readFileSync } from "fs";
import { lua, lauxlib, lualib, to_luastring } from "fengari";

export function loadluaFile(filepath: string) {
  const L = lauxlib.luaL_newstate();
  lualib.luaL_openlibs(L);

  try {
    const LuaCode = readFileSync(filepath, "utf-8");
    
    // Load string dan jalankan Lua code
    const status = lauxlib.luaL_loadstring(L, to_luastring(LuaCode)) || lua.lua_pcall(L, 0, lua.LUA_MULTRET, 0);

    if (status !== lua.LUA_OK) {
      const error = lua.lua_tojsstring(L, -1);
      lua.lua_pop(L, 1);
      throw new Error(`Error executing Lua: ${error}`);
    }

    console.log(`Successfully loaded Lua file: ${filepath}`);
    return L;
  } catch (error) {
    console.error("Error loading Lua file:", error);
    return null;
  }
}