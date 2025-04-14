<?php

$api->group(['prefix' => 'order-detail'], function () use ($api) {
    $api->get('/{id}', 'OrderDetailController@getOrderDetailsByOrderId');
});
