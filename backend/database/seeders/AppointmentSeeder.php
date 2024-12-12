<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    public function run()
    {
        Appointment::insert([
            [
                'customer_id' => 1,
                'service_id' => 1,
                'pet_name' => 'Mít',
                'appointment_date' => Carbon::now()->addDays(2),
                'status' => 'pending',
                'notes' => 'Cần làm nhanh vì chó dễ bị lạnh.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
