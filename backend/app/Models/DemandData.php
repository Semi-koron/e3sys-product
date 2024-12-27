<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandData extends Model
{    use HasFactory;

    protected $table = 'demand_data'; 
    protected $fillable = ['demandName', 'startTime', 'endTime', 'wantTech', 'joinUser'];

    public function users()
    {
        return $this->belongsToMany(UserData::class, 'user_demand', 'demand_id', 'user_id');
    }

    public function wantedTech()
    {
        return $this->belongsTo(TechData::class, 'wantTech');
    }}