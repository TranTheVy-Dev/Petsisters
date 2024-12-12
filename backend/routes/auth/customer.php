<?php

$api->group(['prefix' => 'customer'], function () use ($api) {
    $api->get('/', 'CustomerController@index');
    $api->get('/{id}', 'CustomerController@show');
    $api->post('/', 'CustomerController@store');
});