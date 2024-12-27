<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;

    protected $table = 'user_data';
    protected $fillable = ['userName', 'uuid', 'masteredTech', 'joinDemand'];

    public function joinedDemands()
    {
        return $this->belongsToMany(DemandData::class, 'user_demand', 'user_id', 'demand_id');
    }

    public function masteredTechnologies()
    {
        return $this->belongsToMany(TechData::class, 'user_tech', 'user_id', 'tech_id');
    }
}
