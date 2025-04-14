<?php

$api->group(['prefix' => 'service'], function () use ($api) {
    $api->get('/', 'ServiceController@index');
});
