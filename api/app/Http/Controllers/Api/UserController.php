<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::get();
        return response($users);
    }

    public function update(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $user->name = $request->filled('name') ? $request->name : $user->name;
        $user->email = $request->filled('email') ? $request->email : $user->email;
        $user->update();
        return response($user, 200);
    }

    public function destroy($userId)
    {
        $user = User::findOrFail($userId);
        $user->delete();
        return response('user deleted!', 201);
    }
}
