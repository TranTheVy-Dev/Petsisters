<?php

$api->group(['prefix' => 'category'], function () use ($api) {
    $api->get('/', 'CategoryController@index');
    $api->get('/{category_type}', 'CategoryController@categoryType');
    $api->post('/', 'CategoryController@store');
    $api->put('/{id}', 'CategoryController@update');
    $api->delete('/{id}', 'CategoryController@destroy');
    $api->delete('/{id}/force', 'CategoryController@forceDestroy');
});
