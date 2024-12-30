<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    /** @use HasFactory<\Database\Factories\UserDataFactory> */
    use HasFactory;

    public function learned()
    {
        return $this->belongsToMany(
            TechData::class,
            'tech_user'
        )->withTimestamps();
    }

    public function join()
    {
        return $this->belongsToMany(DemandData::class, 'demand_user')->withTimestamps();
    }
}
