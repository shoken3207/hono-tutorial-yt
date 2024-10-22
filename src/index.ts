import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import posts from "./controllers/posts";

export const app = new Hono();
app.use("*", prettyJSON());
app.route("/posts", posts);

app.get("/", (c) => c.text("hello hono"));

export default app;
