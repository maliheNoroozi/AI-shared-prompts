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
    <section className="flex gap-4 flex-wrap">
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
