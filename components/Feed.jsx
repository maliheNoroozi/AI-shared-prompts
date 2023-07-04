"use client";

import React, { useState, useEffect } from "react";
import PromptCardList from "@components/PromptCardList";

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/prompts");
        const data = await response.json();
        setPrompts(data);
        setFilteredPrompts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrompts();
  }, []);

  const handleFilterChange = (event) => {
    clearTimeout(searchTimeout);
    setFilter(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(event.target.value);
        setFilteredPrompts(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setFilter(tag);
    const searchResult = filterPrompts(tag);
    setFilteredPrompts(searchResult);
  };

  const filterPrompts = (filter) => {
    const regex = new RegExp(filter, "i");

    return prompts.filter((item) => {
      if (filter === "") return item;
      return (
        regex.test(item.prompt) ||
        regex.test(item.tag) ||
        regex.test(item.creator.username)
      );
    });
  };

  return (
    <section>
      <form className="my-6 text-center">
        <input
          required
          type="text"
          placeholder="Search for a tag or username"
          value={filter}
          onChange={handleFilterChange}
          className="min-w-[312px] px-6 py-3 rounded-[4px] border border-[#d6cece]"
        />
      </form>
      <PromptCardList
        prompts={filteredPrompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
