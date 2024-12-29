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
        return $this->belongsToMany(UserData::class)->withTimestamps();
    }

    public function needed()
    {
        return $this->belongsToMany(DemandData::class)->withTimestamps();
    }

    public function parent()
    {
        return $this->belongsToMany(TechData::class)->withTimestamps();
    }

    public function children()
    {
        return $this->belongsToMany(TechData::class)->withTimestamps();

    }
}
