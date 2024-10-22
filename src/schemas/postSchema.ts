import { z } from "zod";

const postIdSchema = z
	.string()
	.min(1)
	.regex(/^\d+$/, {
		message: "ID must be a string of digits",
	})
	.transform((val) => Number(val));

const postTitleSchema = z
	.string()
	.min(1, "入力必須の項目です")
	.max(100, "入力上限文字数を超えています");

const postContentSchema = z
	.string()
	.min(1, "入力必須の項目です")
	.max(5120, "入力上限文字数を超えています");

const postSchema = z.object({
	id: postIdSchema,
	title: postTitleSchema,
	content: postContentSchema,
});

const createPostSchema = z.object({
	title: postTitleSchema,
	content: postContentSchema,
});

export {
	postIdSchema,
	postTitleSchema,
	postContentSchema,
	postSchema,
	createPostSchema,
};
