<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\ThoughtController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*For Tasks */
Route::post('/savetask', [TodoController::class, 'create']);
Route::get('tasks', [TodoController::class, 'index']);
Route::delete('/deletetask/{id}', [TodoController::class, 'delete']);
Route::get('/edittask/{id}', [TodoController::class, 'edit']);
Route::put('updatetask/{id}', [TodoController::class, 'update']);
/*For Thoughts */
Route::post('/savethought', [ThoughtController::class, 'create']);
Route::get('thoughts', [ThoughtController::class, 'index']);
Route::delete('/deletethought/{id}', [ThoughtController::class, 'delete']);
Route::get('/editthought/{id}', [ThoughtController::class, 'edit']);
Route::put('updatethought/{id}', [ThoughtController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
