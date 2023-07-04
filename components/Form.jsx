import React from "react";
import Link from "next/link";

const Form = ({ type, submitting, prompt, setPrompt, handleSubmit }) => {
  return (
    <section>
      <h1>{type} Prompt</h1>
      <p className="text-gray-700 mt-3">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 flex flex-col gap-7 mt-5 p-5 rounded-lg"
      >
        <label>
          <span className="font-bold text-gray-700">Your AI Prompt</span>
          <textarea
            required
            value={prompt.desc}
            onChange={(event) =>
              setPrompt({ ...prompt, desc: event.target.value })
            }
            placeholder="Write your propt here..."
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-bold text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopement, #idea)
            </span>
          </span>

          <input
            required
            value={prompt.tag}
            onChange={(event) =>
              setPrompt({ ...prompt, tag: event.target.value })
            }
            placeholder="#tag"
            className="form_input"
          />
        </label>
        <div className="flex-end gap-4 mx-3 mb-4">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="primary_button w-[6rem]"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
