import { Hono } from "hono";
import {
	createPostSchema,
	postIdSchema,
	postSchema,
} from "../schemas/postSchema";
import { safeParseValidationErrors } from "../utils/validations";

let blogPosts = [
	{ id: 1, title: "Blog1", content: "Blog1 Posts" },
	{ id: 2, title: "Blog2", content: "Blog2 Posts" },
	{ id: 3, title: "Blog3", content: "Blog3 Posts" },
];

const app = new Hono();

app.get("/", (c) => c.json({ posts: blogPosts }));

app.get("/:id", async (c) => {
	const id = c.req.param("id");
	const result = postIdSchema.safeParse(id);

	if (!result.success) {
		return safeParseValidationErrors(result.error, c);
	}
	const post = blogPosts.find((post) => post.id === result.data);
	if (!post) {
		return c.json({ message: "not found this post" }, 404);
	}
	return c.json(post);
});

app.post("/", async (c) => {
	const result = createPostSchema.safeParse(await c.req.json());
	if (!result.success) {
		return safeParseValidationErrors(result.error, c);
	}
	const { title, content } = result.data;
	const newPost = { id: blogPosts.length + 1, title, content };
	blogPosts = [...blogPosts, newPost];

	return c.json(newPost, 201);
});

app.put("/:id", async (c) => {
	const id = c.req.param("id");
	const result = postSchema.safeParse({ ...(await c.req.json()), id });
	if (!result.success) {
		return safeParseValidationErrors(result.error, c);
	}
	const { id: parseId, title, content } = result.data;
	const index = blogPosts.findIndex((post) => post.id === parseId);
	if (index === -1) {
		return c.json({ message: "not found this post" }, 404);
	}
	blogPosts[index] = { ...blogPosts[index], title, content };
	return c.json(blogPosts[index], 200);
});

app.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const result = postIdSchema.safeParse(id);

	if (!result.success) {
		return safeParseValidationErrors(result.error, c);
	}
	blogPosts = blogPosts.filter((post) => post.id !== result.data);
	return c.json({ message: "ポストを削除しました" }, 200);
});

export default app;
