<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\PriceList;
use Illuminate\Support\Arr;

class Controller extends BaseController
{
    use ApiResponse;
public function priceList(array $data)
{
    $pet_weight = $data['pet_weight'];
    $service_id = $data['service_id'];
    $service_idWithoutPet_weight = [4,5];
    $query = PriceList::Where('service_id',$service_id);
    //phu dinh dieu kien dua ra
    if (!in_array($service_id,$service_idWithoutPet_weight)) {
        $query->where('pet_weight',$pet_weight);
    }
    return $query->first();
}
    public function store(Request $request)
    {
        $file = $request->file('image');
        $path = $file->store('images', 'public');
        return response()->json(['path' => Storage::url($path)]);
    }
}
