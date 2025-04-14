<?php

$api->group(['prefix' => 'test'], function () use ($api) {
    $api->get('/', 'TestController@index');
    $api->get('/{id}', 'TestController@show');
    $api->post('/', 'TestController@store');
    $api->put('/{id}', 'TestController@update');
    $api->delete('/{id}', 'TestController@destroy');
    $api->delete('/{id}/force', 'TestController@forceDestroy');
});
