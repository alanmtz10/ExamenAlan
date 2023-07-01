<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Models\Employee;
use Carbon\Carbon;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::query()->withCount('skills')->get();

        return response()->json([
            'message' => 'Employees retrieved successfully',
            'data'    => $employees,
        ],);
    }

    public function show($id)
    {
        $employee = Employee::query()->with('skills')->findOrFail($id);

        return response()->json([
            'message' => 'Employee retrieved successfully',
            'data'    => $employee,
        ]);
    }

    public function store(StoreEmployeeRequest $request)
    {
        /** @var Employee $employee */
        $employee = Employee::query()->create([
            'name'      => $request->validated('name'),
            'email'     => $request->validated('email'),
            'home'      => $request->validated('home'),
            'position'  => $request->validated('position'),
            'birthdate' => Carbon::parse($request->validated('birthdate'))->format('Y-m-d'),
        ]);

        $employee->skills()->createMany(collect($request->validated('skills')));
        $employee->load('skills');

        return response()->json([
            'message' => 'Employee created successfully',
            'data'    => $employee,
        ], 201);
    }

    public function destroy($id)
    {
        $employee = Employee::query()->findOrFail($id);
        $employee->skills()->delete();
        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully',
            'data'    => $employee,
        ]);
    }
}
