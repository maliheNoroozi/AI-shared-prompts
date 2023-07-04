"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    desc: "",
    tag: "",
  });

  const createPrompt = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt.desc,
          tag: prompt.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      submitting={submitting}
      prompt={prompt}
      setPrompt={setPrompt}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
