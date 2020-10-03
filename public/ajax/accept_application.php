<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'accept-application') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

$applicationId = methodGet('application_id', 'post');

//verifying
checkAuth();

//success
$customerId = sessionGet('user_id');
$query = "UPDATE applications SET customer_id = {$customerId} WHERE id = {$applicationId};";
makeQuery($query);

$query = "SELECT author_id FROM applications WHERE id = {$applicationId};";
$authorId = mqagd($query)['author_id'];

$url = "botlocation.com?author_id={$authorId}&customer_id={$customerId}";

file_get_contents($url);

makeResponse(ERR_OK);
