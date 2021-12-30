<?php

namespace App\Http\Controllers;
use App\Models\Thought;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ThoughtController extends Controller
{
    public function index () {
        $thought = Thought::all();
        return response()->json(['status'=>200, "thoughts"=>$thought]);
    }
    public function create (Request $request) {
        $validator = Validator::make($request-> all(), [
            "idea"=>"required",
            "date"=>"required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validate_err"=>$validator->errors()]);
        }
        else {
            $thought = New Thought();
            $thought->idea=$request->input('idea');
            $thought->date=$request->input('date');
            $thought -> save();
            return response()->json(['status'=>200, 'message'=>'Thought has been Saved']);
       
        }
    }
    public function delete ($id) {
        $thought = Thought::find($id);
        if ($thought) {
            $thought->delete();
            return response()->json(['status'=>200,'message'=>'Thought has been deleted']);
        }
        else {
            return response()->json(['status'=>404, 'message'=>'No Thought id found']);
        }
    }
    public function edit ($id) {
        $thought = Thought::find($id);
        if ($thought) {
            return response()->json(['status'=>200, 'thought'=>$thought]);
        }
        else {
            return response()->json(['status'=>404, 'message'=>'No thought id found']);
        }
    }
    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(),[
            "idea"=> "required",
            "date"=>"required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validationError"=>$validator->errors()]);
        }
        else {
            $thought = Thought::find($id);
            if ($thought) {
                $thought->idea=$request->input('idea');
                $thought->date=$request->input('date');
                $thought->update();
                return response()->json(['status'=>200,  'message'=>'Thought updated succesfully']);
            }
            else {
                return response()->json(['status'=>404, 'message'=>'No Thought id found']);
            }
        }
    } 
}
