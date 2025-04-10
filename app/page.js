"use client";

import Navbar from "./components/Navbar";
import Sidebar from "../app/components/Sidebar";
import Editor from "./components/Editor";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos", {
      cache: "no-store",
    });
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddOrUpdate = async (todo, isEdit = false) => {
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch("/api/todos", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (res.ok) {
      setSelectedTodo(null);
      fetchTodos();
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setSelectedTodo(null);
      return;
    }
    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setSelectedTodo(null);
      fetchTodos();
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen px-30 py-18 bg-gray-200 flex justify-between ">
        <Sidebar
          todos={todos}
          setSelectedTodo={setSelectedTodo}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <Editor
          selectedTodo={selectedTodo}
          onSave={handleAddOrUpdate}
          onClearSelectedTodo={() => {
            setSelectedTodo(null);
            setSelectedId(null);
          }}
          onDelete={(id) => {
            handleDelete(id);
            setSelectedId(null);
          }}
        />
      </div>
    </div>
  );
}
