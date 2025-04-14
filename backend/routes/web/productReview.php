<?php
$api->group(["prefix" => "productreview"], function () use ($api) {
    $api->post('/', 'ProductReviewController@submitreview');
    $api->get('/{id}', 'ProductReviewController@reviewByProduct');
});
