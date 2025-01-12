<?php

namespace App\Http\Controllers;

use App\Models\TechData;
use Illuminate\Http\Request;

class TechDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // 中間テーブルも結合して取得
        $techData = TechData::with('children', 'parent')->get();

        return response()->json($techData);
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
        //
        $techData = new TechData();
        $techData->name = $request->input('techName');
        $techData->save();

        // childTechの配列を取得
        $childTech = $request->input('childTechIds');
        $techData->parent()->attach($childTech);
        // parentTechの配列を取得
        $parentTech = $request->input('parentTechIds');
        $techData->children()->attach($parentTech);

        return response()->json(['message' => 'Tech data created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(TechData $techData)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TechData $techData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TechData $techData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TechData $techData)
    {
        //
    }
}
