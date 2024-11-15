"use client";

import "./styles.css";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { submitPost } from "@/components/posts/editor/actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";

import React from "react";
import { Button } from "@/components/ui/button";

export default function PostEditor() {
  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's on ur mind? Sweet-heart",
      }),
    ],
    immediatelyRender: false,
  });
  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    await submitPost(input);
  }

  return (
    <div className="flex flex-col gap-5 rounded-2-xl bg-card p-5 shadow-sm">
      <div className="flex gap-5 ">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3 "
        />
      </div>
      <div>
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20 "
        >
          Post
        </Button>
      </div>
    </div>
  );
}
