<?php
$api->group(["prefix"=>"comment"], function() use($api) {
    $api->get('/','CommentBlogController@show');
    $api->post('/','CommentBlogController@postComment');
    $api->get('/{id}','CommentBlogController@commentById');
})
?>
