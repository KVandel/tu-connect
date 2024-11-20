"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Something went wrong");

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post)
    throw new Error(
      "Something went wrong. I guess u dont have any post to delete or this post is already deleted.",
    );

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });
  return deletedPost;
}
