<?php

namespace App\Models;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{   use HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'firebase_uid'];
    protected $hidden = ['password', 'remember_token'];

    public function demands()
    {
        return $this->belongsToMany(DemandData::class, 'user_demand', 'user_id', 'demand_id');
    }

    public function masteredTech()
    {
        return $this->belongsToMany(TechData::class, 'user_tech', 'user_id', 'tech_id');
    }}
