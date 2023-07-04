"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState("");

  const loggedInUserId = session?.user.id;

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleProfileClick = () => {
    router.push(
      `/profile/${prompt.creator._id.toString()}?${createQueryString(
        "username",
        prompt.creator.username
      )}`
    );
  };

  const handleCopyClick = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div
        onClick={handleProfileClick}
        className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
      >
        <Image
          alt="user-image"
          src={prompt.creator.image}
          loader={() => prompt.creator.image}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {prompt.creator.username}
          </h3>
          <p className="text-sm text-gray-500">{prompt.creator.email}</p>
        </div>

        <Image
          alt="copy"
          src={
            copied === prompt.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
          loader={() =>
            copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"
          }
          width={12}
          height={12}
          onClick={handleCopyClick}
        />
      </div>
      <p className="my-4 text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="blue_gradient text-sm cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >{`#${prompt.tag}`}</p>

      {loggedInUserId === prompt.creator._id && pathName === "/profile" && (
        <div className="flex-end gap-4 mt-3">
          <div
            className="cursor-pointer text-[#21899af7]"
            onClick={() => handleEdit && handleEdit(prompt)}
          >
            Edit
          </div>
          <div
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete && handleDelete(prompt)}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
