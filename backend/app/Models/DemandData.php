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
        return $this->belongsToMany(UserData::class);
    }

    /**
     * The want that belong to the DemandData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function want(): BelongsToMany
    {
        return $this->belongsToMany(TechData::class);
    }


}
