<?php

$api->group(['prefix' => 'appointment'], function () use ($api) {
    $api->post('/', 'AppointmentController@store');
});
