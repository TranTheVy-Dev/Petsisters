<?php

$api->group(['prefix' => 'appointment'], function () use ($api) {
    $api->post('/', 'AppointmentController@store');
    $api->get('/', 'AppointmentController@index');
    $api->get('/{id}', 'AppointmentController@getAppointmentByIdCustomer');

    
});
