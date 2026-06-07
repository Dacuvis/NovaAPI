import { Context } from "elysia"

export function Auth({headers, set}: Context) {
    const apiKey = headers["x-api-key"]

    if(apiKey !== process.env.API_KEY) {
        set.status = 401
        return {
            succes: false,
            message: "Unauthorized"
        }
    }
}