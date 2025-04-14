<?php
$api->group(['prefix' => 'post'], function () use ($api) {
  $api->get('/', 'PostController@index');
  $api->get('/{id}', 'PostController@show');
  $api->post('/', 'PostController@store');
  $api->put('/{id}', 'PostController@update');
  $api->delete('/{id}', 'PostController@destroy');
  $api->delete('/{id}/force', 'PostController@forceDestroy');
  $api->get('/{id}/restore', 'PostController@restore');
});
