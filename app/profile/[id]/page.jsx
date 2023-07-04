"use client";

import React, { useState, useEffect, useCallback } from "react";
import Profile from "@components/Profile";
import { useParams, useSearchParams } from "next/navigation";

function UserProfile() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [prompts, setPrompts] = useState([]);

  const userId = params.id;
  const username = searchParams.get("username");

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

  return (
    <Profile
      name={username}
      desc={`Welcome ${username} profile page`}
      prompts={prompts}
    />
  );
}

export default UserProfile;
