<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    /** @use HasFactory<\Database\Factories\UserDataFactory> */
    use HasFactory;

    /**
     * The join that belong to the UserData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function join(): BelongsToMany
    {
        return $this->belongsToMany(DemandData::class);
    }

    /**
     * The master that belong to the UserData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function master(): BelongsToMany
    {
        return $this->belongsToMany(TechData::class);
    }

    /**
     * The mastering that belong to the UserData
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function mastering(): BelongsToMany
    {
        return $this->belongsToMany(TechData::class);
    }
}
