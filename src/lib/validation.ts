import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");
export const signUpSchema = z.object({
  email: requiredString.email("Email is required"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only Letters, numbers, _ and - allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});
export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z
    .array(z.string())
    .max(5, "This is not Facebook bro! Stop adding your entire album"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Must be at most 1000 characters"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
