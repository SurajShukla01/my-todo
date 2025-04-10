"use client";
import React, { useEffect, useState } from "react";

const Editor = ({
  selectedTodo,
  onSave,
  onClearSelectedTodo,
  onDelete,
  onBack,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [selectedTodo]);

  const addTodo = () => {
    if (!title.trim() || !description.trim()) return;

    const todo = {
      ...selectedTodo,
      title,
      description,
    };

    const isEdit = Boolean(selectedTodo);
    onSave(todo, isEdit);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="md:mt-8 lg:w-full rounded-xl bg-white text-black px-6 sm:px-18 lg:px-16 py-16 shadow">
      <div className="flex flex-col gap-2">
        <div className="lg:hidden mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 font-bold cursor-pointer"
          >
            <span className="text-xl">&larr;</span>Back
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full text-3xl font-semibold sm:text-5xl pr-2 sm:px-3 sm:py-6 outline-none"
            />
            <button
              className="scale-150 hover:scale-200 transition-all cursor-pointer text-xl"
              onClick={() => {
                onDelete(selectedTodo?.id);
                onClearSelectedTodo();
                setTitle("");
                setDescription("");
              }}
            >
              🗑️
            </button>
          </div>

          <hr
            className="w-full"
            style={{
              borderTop: "3px_double_#333",
              color: "#333",
              overflow: "visible",
              textAlign: "center",
              height: "5px",
            }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full text-2xl px-3 py-6 outline-none h-64"
          ></textarea>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-red-500 hover:text-black cursor-pointer transition-colors"
            onClick={() => {
              onClearSelectedTodo();
              setTitle("");
              setDescription("");
            }}
          >
            Clear Selection
          </button>

          <button
            disabled={!title.trim() || !description.trim()}
            className={`px-4 py-2 rounded text-white transition-colors ${
              title.trim() && description.trim()
                ? "bg-black hover:bg-blue-400 hover:text-black cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={addTodo}
          >
            {selectedTodo?.id ? "Save Changes" : "Add Todo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
