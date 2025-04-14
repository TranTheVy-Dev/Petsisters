<?php

$api->group(['prefix' => 'cloudinary'], function () use ($api) {
    $api->get('/', 'CloudinaryController@index');
    $api->get('/get-all', 'CloudinaryController@getAllImages');
    $api->delete('/{asset_id}', 'CloudinaryController@deleteCloudinaryImage');
    $api->post('/update-image', 'CloudinaryController@updatePublicIdCloudinaryImage');
});
