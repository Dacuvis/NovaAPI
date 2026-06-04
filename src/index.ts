import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { docsRoute } from "./module/docs/docs.route";
import { moodRoute } from "./module/mood/mood.route";
import { APPError } from "./utils/errorHandler";
import { loadluaFile } from "./utils/loader";
import { lua, to_luastring } from "fengari";

const config = loadluaFile("./config/config.lua")

lua.lua_getfield(config,  -1,to_luastring("port"));
const port = lua.lua_tointeger(config, -1);
lua.lua_pop(config, 1);

const app = new Elysia()

  .use(
    rateLimit({
      max: 100,
      duration: 60 * 1000,
    })
  )

  .onError(({ error, set }) => {
    if (error instanceof APPError) {
      set.status = error.statusCode;
      return {
        error: error.message,
      };
    }

    set.status = 500;
    return {
      error: "Internal Server Error",
    };
  })

  .use(docsRoute)
  .use(moodRoute)

  .listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
