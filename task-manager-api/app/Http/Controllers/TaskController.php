<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks - List all tasks
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks, 200);
    }

    // POST /api/tasks - Create a new task
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:pending,in_progress,completed',
        ]);

        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // GET /api/tasks/{id} - View a single task
    public function show(Task $task)
    {
        return response()->json($task, 200);
    }

    // PUT /api/tasks/{id} - Update a task
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:pending,in_progress,completed',
        ]);

        $task->update($request->all());
        return response()->json($task, 200);
    }

    // DELETE /api/tasks/{id} - Delete a task
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}