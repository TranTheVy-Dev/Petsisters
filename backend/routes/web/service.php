<?php

$api->group(['prefix' => 'service'], function () use ($api) {
    $api->get('/', 'ServiceController@index');
    $api->get('/{slug}', 'ServiceController@show');
    $api->post('/', 'ServiceController@store');
    $api->put('/{id}', 'ServiceController@update');
    $api->delete('/{id}', 'ServiceController@destroy');
    $api->delete('/{id}/force', 'ServiceController@forceDestroy');
    $api->get('/{id}/restore', 'ServiceController@restore');
});
