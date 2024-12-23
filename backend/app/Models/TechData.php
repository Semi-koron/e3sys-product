<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechData extends Model
{
    /** @use HasFactory<\Database\Factories\TechDataFactory> */
    use HasFactory;
    
    /**
     * The needed that belong to the TechData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function needed(): BelongsToMany
    {
        return $this->belongsToMany(TechData::class, 'tech_data', 'neededTech', 'needTech');
    }

    /**
     * The need that belong to the TechData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function need(): BelongsToMany
    {
        return $this->belongsToMany(TechData::class, 'tech_data', 'needTech', 'neededTech');
    }

    /**
     * The wanted that belong to the TechData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function wanted(): BelongsToMany
    {
        return $this->belongsToMany(DemandData::class);
    }

    /**
     * The learner that belong to the TechData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function learner(): BelongsToMany
    {
        return $this->belongsToMany(UserData::class);
    }

    /**
     * The master that belong to the TechData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function master(): BelongsToMany
    {
        return $this->belongsToMany(UserData::class);
    }
}
