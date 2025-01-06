<?php

namespace App\Http\Controllers;

use App\Models\UserData;
use Illuminate\Http\Request;

class UserDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $uuid = $request->input('uuid');
        $name = $request->input('name');

        // 同じuuidが存在するか確認、存在する場合は上書き
        $existingUserData = UserData::where('uuid', $uuid)->first();
        if($existingUserData){
            $existingUserData->name = $name;
            $existingUserData->save();
            return response()->json(['message' => 'User data updated']);
        }
        $userData = new UserData();
        $userData->uuid = $uuid;
        $userData->name = $name;
        $userData->save();
        // 保存できた事を確認するために保存したデータを返す

        // techIdの配列を取得
        $techIds = $request->input('techIds');
        // techIdの配列とuserDataのidを中間テーブルに保存またtechIdとuserDataのidとstatusの文字列を保存
        $userData->learned()->attach($techIds, ['status' => 'mastered']);

        return response()->json(['message' => 'User data created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $uuid = $request->input('uuid');
        //中間テーブルも結合して取得
        $userData = UserData::with('learned','join')->where('uuid', $uuid)->first();

        return response()->json($userData);
        if(!$userData){
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($userData);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserData $userData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserData $userData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserData $userData)
    {
        //
    }

    public function search(Request $reaquest){
        $uuid = $request->input('uuid');
        $userData = UserData::where('uuid', $uuid)->first();
        if(!$userData){
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($userData);
    }
}
