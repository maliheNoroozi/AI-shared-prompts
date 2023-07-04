"use client";

import React, { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);

  const userId = session?.user.id;

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/prompts`);
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchPrompts();
    }
  }, [userId]);

  const handleEdit = (prompt) => {
    router.push(`prompts/${prompt._id}/edit`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete the prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompts/${prompt._id.toString()}`, {
          method: "Delete",
        });
        const filteredPrompts = prompts.filter(
          (item) => item._id !== prompt._id
        );
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      prompts={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
