<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'logout') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
$id = sessionGet('user_id');
$query = "UPDATE users SET session_hash = '' WHERE id = {$id};";
makeQuery($query);
session_unset();
session_destroy();

makeResponse(ERR_OK);
