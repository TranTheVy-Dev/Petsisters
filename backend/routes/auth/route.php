<?php

$api->group(['prefix' => 'auth', 'namespace' => 'Api\V1\Auth'], function ($api){
    //TODO: Check CORS
    require __DIR__ . '/test.php';
    require __DIR__ . '/product.php';
    require __DIR__ . '/order.php';
    require __DIR__ . '/order_detail.php';
    require __DIR__ . '/customer.php';
    require __DIR__ . '/service.php';
    require __DIR__ . '/appointment.php';
    require __DIR__ . '/cloudinary.php';
    
});


