<?php
$api->group(["prefix"=>"contact"], function() use($api) {
    $api->post('/','ContactController@sendContactForm');
})
?>
