<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechData extends Model
{   use HasFactory;

    protected $table = 'tech_data'; 
    protected $fillable = ['name', 'needTech', 'neededTech'];

    public function masteredBy()
    {
        return $this->belongsToMany(UserData::class, 'user_tech', 'tech_id', 'user_id');
    }

    public function demandedBy()
    {
        return $this->hasMany(DemandData::class, 'wantTech');
    }

    public function needs()
    {
        return $this->belongsTo(TechData::class, 'needTech');
    }

    public function neededBy()
    {
        return $this->belongsTo(TechData::class, 'neededTech');
    }
}
