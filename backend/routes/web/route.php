<?php

$api->group(['prefix' => 'web', 'namespace' => 'Api\V1\Web'], function ($api) {
    //TODO: Check CORS
    require __DIR__ . '/category.php';
    require __DIR__ . '/post.php';
    require __DIR__ . '/product.php';
    require __DIR__ . '/service.php';
    require __DIR__ . '/user.php';
    require __DIR__ . '/review.php';
    require __DIR__ . '/comment.php';
    require __DIR__ . '/productReview.php';
    require __DIR__ . '/contact.php';

});
