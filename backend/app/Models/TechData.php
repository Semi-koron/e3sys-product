<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechData extends Model
{
    /** @use HasFactory<\Database\Factories\TechDataFactory> */
    use HasFactory;

    public function learn()
    {
        return $this->belongsToMany(UserData::class, 'tech_user')->withTimestamps();
    }

    public function needed()
    {
        return $this->belongsToMany(DemandData::class, 'demand_tech')->withTimestamps();
    }

    public function parent()
    {
        return $this->belongsToMany(TechData::class, 'ptech_ctech')->withTimestamps();
    }

    public function children()
    {
        return $this->belongsToMany(TechData::class, 'ptech_ctech')->withTimestamps();

    }
}
