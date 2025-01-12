<?php

namespace App\Http\Controllers;

use App\Models\DemandData;
use Illuminate\Http\Request;

class DemandDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demandData = DemandData::with('need')->get();
        return response()->json($demandData);
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
        $name = $request->input('name');
        $endTime = $request->input('end_time');
        $startTime = $request->input('start_time');
        $techId = $request->input('techId');
        $demandData = new DemandData();
        $demandData->start_date = $startTime;
        $demandData->end_date = $endTime;
        $demandData->name = $name;
        $demandData->save();

        $demandData->need()->attach($techId);

        return response()->json(['message' => 'Demand data created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(DemandData $demandData)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DemandData $demandData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DemandData $demandData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DemandData $demandData)
    {
        //
    }
}
