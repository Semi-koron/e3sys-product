<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandData extends Model
{
    /** @use HasFactory<\Database\Factories\DemandDataFactory> */
    use HasFactory;

    public function need()
    {
        return $this->belongsToMany(TechData::class, 'demand_tech')->withTimestamps();
    }

    public function joined()
    {
        return $this->belongsToMany(UserData::class, 'demand_user')->withTimestamps();
    }

}
