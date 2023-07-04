"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const EditPrompt = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({ desc: "", tag: "" });

  const userId = session?.user.id;
  const promptId = params.id;

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompts/${promptId}`);
      const data = await response.json();
      setPrompt({
        desc: data.prompt,
        tag: data.tag,
      });
    };

    if (userId && promptId) {
      fetchPrompt();
    }
  }, [userId, promptId]);

  const updatePrompt = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert("Prompt Id not found.");
    }

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt.desc,
          tag: prompt.tag,
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
      type="Edit"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
