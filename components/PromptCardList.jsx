"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({
  prompts,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="grid gap-[20px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default PromptCardList;
