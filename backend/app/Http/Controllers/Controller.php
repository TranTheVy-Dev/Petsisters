<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use ApiResponse;

    public function store(Request $request)
    {
        $file = $request->file('image');
        $path = $file->store('images', 'public');
        return response()->json(['path' => Storage::url($path)]);
    }
}
