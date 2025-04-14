<?php

$api->group(['prefix' => 'order'], function () use ($api) {
    $api->post('/', 'OrderController@store');
    $api->get('/', 'OrderController@index');
    $api->get('/{id}', 'OrderController@getOrderByIdCustomer');
});
