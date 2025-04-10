// import { todos } from "../../../data/todos.js";
import { ObjectId } from "mongodb";
import { connectToDb } from "../db";

export async function GET() {
  const { db } = await connectToDb();
  const todos = await db
    .collection("todos")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return new Response(JSON.stringify(todos), {
    status: 200,
    header: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();

    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // todos.unshift(newTodo);
    const { db } = await connectToDb();
    const result = await db.collection("todos").insertOne(newTodo);

    // return Response.json(todos, { status: 201 });
    return new Response(
      JSON.stringify({ ...newTodo, _id: result.insertedId.toString() }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response("Error creating todo", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedTodo = await request.json();
    // const index = todos.findIndex((t) => t.id === updatedTodo.id);
    const { db } = await connectToDb();
    const result = await db.collection("todos").updateOne(
      { id: updatedTodo.id },
      {
        $set: {
          title: updatedTodo.title,
          description: updatedTodo.description,
          updatedAt: new Date().toISOString(),
        },
      }
    );
    if (result.modifiedCount === 0) {
      return new Response("Todo not found or no changes made", { status: 404 });
    }

    return new Response("Updated Successfully", { status: 200 });
  } catch (error) {
    return new Response("Error updating todo", { status: 500 });
  }
  // if (index !== -1) {
  //   todos[index] = {
  //     ...todos[index],
  //     ...updatedTodo,
  //     updatedAt: new Date().toISOString(),
  //   };
  //   return new Response(JSON.stringify(todos[index]), { status: 200 });
  // }
  // return new Response("Todo not found", { status: 404 });
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const { db } = await connectToDb();

    const result = await db.collection("todos").deleteOne({ id: id });
    if (result.deletedCount === 0) {
      return new Response("Todo not found", { status: 404 });
    }
    return new Response("Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Deleting todo", { status: 500 });
  }

  // const index = todos.findIndex((t) => t.id === id);
  // if (index !== -1) {
  //   todos.splice(index, 1);
  //   return new Response("Deleted", { status: 200 });
  // }
}
