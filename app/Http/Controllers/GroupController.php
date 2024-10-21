<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller {
    public function store(Request $request) {
        $request->validate(['name' => 'required|string']);

        $group = Group::create(['name' => $request->name]);
        $group->users()->attach(auth()->id());

        return response()->json($group, 201);
    }

    public function update(Request $request, $id) {
        $group = Group::findOrFail($id);
        $group->name = $request->name;
        $group->save();

        return response()->json($group);
    }
}
