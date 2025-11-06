<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        $query = Task::with('users')->where('user_id', auth()->user()->user_id);

        if (request()->has('status')) {
            $query->where('status', request()->query('status'));
        }

        if (request()->has('deadline')) {
            $query->whereDate('deadline', request()->query('deadline'));
        }

        $tasks = $query->get();

        return response()->json([
            'message' => 'Success!',
            'data' => $tasks
        ]);
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
            'title' => 'required|string|min:3',
            'description' => 'required',
            'status' => 'required|in:todo,in_progress,done',
            'deadline' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }

        $task = Task::create([
            'user_id' => request('user_id'),
            'title' => request('title'),
            'description' => request('description'),
            'status' => request('status'),
            'deadline' => request('deadline'),
            'created_by' => auth()->user()->name
        ]);

        if ($task) {
            return response()->json([
                'message' => 'Add Task Successfully!',
                'data' => $task
            ], 200);
        } else {
            return response()->json(['message' => 'Add Taks Failed!'], 400);
        }
    }

    public function show($task_id)
    {
        $task = Task::with('users')->find($task_id);

        if ($task) {
            return response()->json([
                'message' => 'Success!',
                'data' => $task
            ], 200);
        } else {
            return response()->json(['message' => 'Task Not Found!'], 400);
        }
    }

    public function update($task_id)
    {
        $validator = Validator::make(request()->all(), [
            'user_id' => 'required',
            'title' => 'required|string|min:3',
            'description' => 'required',
            'status' => 'required|in:todo,in_progress,done',
            'deadline' => 'required'
        ]);


        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }

        $task = Task::find($task_id);

        if (!$task) {
            return response()->json(['message' => 'Task Not Found!'], 400);
        }

        $task = Task::where('task_id', $task_id)->update([
            'user_id' => request('user_id'),
            'title' => request('title'),
            'description' => request('description'),
            'status' => request('status'),
            'deadline' => request('deadline')
        ]);

        if ($task) {
            return response()->json([
                'message' => 'Update Task Successfully!'
            ], 200);
        } else {
            return response()->json(['message' => 'Update Taks Failed!'], 400);
        }
    }

    public function delete($task_id)
    {
        $task = Task::find($task_id);

        if ($task) {

            $deleteTask = Task::where('task_id', $task_id)->delete();

            if ($deleteTask) {

                return response()->json([
                    'message' => 'Success Delete Task!'
                ], 200);
            } else {
                return response()->json(['message' => 'Failed To Delete Task!'], 400);
            }
        } else {
            return response()->json(['message' => 'Task Not Found!'], 400);
        }
    }
}
