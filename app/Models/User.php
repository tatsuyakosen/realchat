<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
    protected $fillable = ['name', 'email', 'password', 'status'];
    protected $hidden = ['password', 'remember_token'];

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function groups() {
        return $this->belongsToMany(Group::class);
    }
}
