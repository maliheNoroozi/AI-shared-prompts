import React from "react";
import PromptCardList from "./PromptCardList";

const Profile = ({ name, desc, prompts, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1>{name} Profile</h1>
      <p className="mb-8">{desc}</p>
      <PromptCardList
        prompts={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Profile;
