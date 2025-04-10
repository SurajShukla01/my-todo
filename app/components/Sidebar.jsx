"use client";

import { useState } from "react";

export default function Sidebar({
  todos,
  setSelectedTodo,
  selectedId,
  setSelectedId,
}) {
  const [searchText, setSearchText] = useState("");

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full md:w-xl p-2">
      <div className="box-border w-[100%] flex items-center justify-between mb-8">
        <button
          className="flex cursor-pointer items-center bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 hover:translate-x-4 hover:text-black hover:scale-125 duration-200"
          onClick={() => {
            setSelectedId(null);
            setSelectedTodo(null);
          }}
        >
          <span>📝</span>
          <span className="ml-2">TODO</span>
        </button>
        <div className="relative w-full ml-8">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search todos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-900 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.map((todo) => {
          const isSelected = selectedId === todo.id;

          return (
            <div
              key={todo.id}
              onClick={() => {
                setSelectedId(todo.id);
                setSelectedTodo(todo);
              }}
              className={`p-3 rounded cursor-pointer transition border-2 ${
                isSelected ? "border-black" : "border-transparent"
              } bg-white hover:bg-gray-100`}
            >
              <h3 className="mb-2 font-semibold text-black text-xl">
                {todo.title.toUpperCase()}
              </h3>
              <p className=" text-md text-gray-700 line-clamp-2">
                {todo.description}
              </p>
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">
                  {new Date(todo.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
