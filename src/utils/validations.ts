import type { Context } from "hono";
import type { ZodError } from "zod";

export const safeParseValidationErrors = (result: ZodError, c: Context) => {
	const errors = result.errors.map(({ path, message }) => {
		return `${path.map((x, i) => (i === path.length - 1 ? x : `${x}、`))}: ${message}`;
	});
	return c.json({ errors });
};
