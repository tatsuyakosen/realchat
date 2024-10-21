<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message; 
use App\Events\MessageSent;

class MessageController extends Controller {
    public function index() {
        return Message::with('user')->get();
    }

    public function store(Request $request) {
        $request->validate(['content' => 'required']);

        $message = Message::create([
            'user_id' => auth()->id(),
            'content' => $request->content,
            'image' => $request->file('image')->store('images'),
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }

    public function markAsRead($id) {
        $message = Message::findOrFail($id);
        $message->is_read = true;
        $message->save();

        return response()->json($message);
    }
}
