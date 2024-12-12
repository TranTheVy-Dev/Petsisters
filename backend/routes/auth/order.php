<?php

$api->group(['prefix' => 'order'], function () use ($api) {
    $api->post('/', 'OrderController@store');
});
