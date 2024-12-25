<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandData extends Model
{
    /** @use HasFactory<\Database\Factories\DemandDataFactory> */
    use HasFactory;

    protected $fillable = ['demandName','startTime', 'endTime','wantTech','joinUser'];


    /**
     * The joined that belong to the DemandData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function joined(): BelongsToMany
    {
         return $this->belongsToMany(UserData::class, 'user_demand', 'demand_data_id', 'user_data_id');
    }

    /**
     * The want that belong to the DemandData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function want(): BelongsToMany
    {
         return $this->belongsToMany(DemandData::class, 'user_demand', 'user_data_id', 'demand_data_id');
    }


}
