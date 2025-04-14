<?php
$api->group(['prefix' => 'user'], function () use ($api) {
    $api->post('/login', 'AuthController@login');
    $api->post('/register','AuthController@register');
    $api->post('/forgotpass','AuthController@forgotPassword');
    $api->post('/resetpass','AuthController@resetPassword');
});
