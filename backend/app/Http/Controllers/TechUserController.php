<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechUser;
use App\Models\UserData;

class TechUserController extends Controller
{
     public function addMastering(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required|exists:user_data,uuid',
            'tech_id' => 'required|exists:tech_data,id',
        ]);

          $user = UserData::where('uuid', $request->uuid)->first();

        TechUser::create([
            'user_data_id' => $user->id,
            'tech_data_id' => $request->tech_id,
            'status' => 'mastering',
        ]);

        return response()->json(['message' => 'Added mastering successfully'], 201);
    }
}
