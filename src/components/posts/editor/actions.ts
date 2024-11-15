"use server";

import { validateRequest } from "@/lib/auth";
import { createPostSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

export async function submitPost(input: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  const { content } = createPostSchema.parse({ content: input });
  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
}