<?php
$api->group(['prefix' => 'review'], function () use ($api) {
    $api->get('/','ServiceReviewController@show');
    $api->get('/{id}','ServiceReviewController@reviewByService');
    $api->post('/','ServiceReviewController@submitreview');
});
?>
