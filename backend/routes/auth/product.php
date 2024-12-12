<?php

$api->group(['prefix' => 'product'], function () use ($api) {
    $api->post('/', 'ProductController@store');
    $api->post('/', 'ProductController@store');
    $api->put('/{id}', 'ProductController@update');
    $api->delete('/{id}', 'ProductController@destroy');
    $api->get('/deleted', 'ProductController@getDeletedProducts');
    $api->post('/restore/{id}', 'ProductController@restore');
    $api->delete('/{id}/force', 'ProductController@forceDestroy');
});
