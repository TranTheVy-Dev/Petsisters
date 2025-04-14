<?php
$api->group(['prefix' => 'product'], function () use ($api) {
    $api->get('/', 'ProductController@index');
    $api->get('/{id}', 'ProductController@show');
    $api->post('/', 'ProductController@store');
    $api->put('/{id}', 'ProductController@update');
    $api->delete('/{id}', 'ProductController@destroy');
    $api->delete('/{id}/force', 'ProductController@forceDestroy');
    $api->get('/{id}/category_type', 'ProductController@productByCatygory');
});
