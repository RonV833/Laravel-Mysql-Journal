<?php

namespace App\Http\Controllers;
use App\Models\Todo;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TodoController extends Controller
{   
    public function index () {
        $task = Todo::all();
        return response()->json(['status'=>200, "tasks"=>$task]);
    }
    public function create (Request $request) {
        $validator = Validator::make($request-> all(), [
            "task"=>"required",
            "date"=>"required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validate_err"=>$validator->errors()]);
        }
        else {
            $todo = New Todo();
            $todo->task=$request->input('task');
            $todo->date=$request->input('date');
            $todo -> save();
            return response()->json(['status'=>200, 'message'=>'Task has been Saved']);
       
        }
    }
    public function delete ($id) {
        $task = Todo::find($id);
        if ($task) {
            $task->delete();
            return response()->json(['status'=>200,'message'=>'Task deleted']);
        }
        else {
            return response()->json(['status'=>404, 'message'=>'No Task id found']);
        }
    }
    public function edit ($id) {
        $task = Todo::find($id);
        if ($task) {
            return response()->json(['status'=>200, 'task'=>$task]);
        }
        else {
            return response()->json(['status'=>404, 'message'=>'No task id found']);
        }
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(),[
            "task"=> "required",
            "date"=>"required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validationError"=>$validator->errors()]);
        }
        else {
            $task = Todo::find($id);
            if ($task) {
                $task->task=$request->input('task');
                $task->date=$request->input('date');
                $task->update();
                return response()->json(['status'=>200,  'message'=>'Task updated succesfully']);
            }
            else {
                return response()->json(['status'=>404, 'message'=>'No Task id found']);
            }
        }
    } 
}
