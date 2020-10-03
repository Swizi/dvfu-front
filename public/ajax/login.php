<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'logination') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}
$login = strtolower(methodGet('login', 'post'));
$password = methodGet('password', 'post');

//data base query -> input
$query = "SELECT id, password FROM users WHERE login = '{$login}';";
$data = mqagd($query);

//case "no user with that login"
if (empty($data)) {
	makeResponse(ERR_NO_SUCH_LOGIN);
}

//password verifying
if (!password_verify($password, $data['password'])) {
  makeResponse(ERR_UNCORRECT_PASSWORD);
}

//success
$hash = getHash(stringGenerate(10));
$query = "UPDATE users SET session_hash = '{$hash}' WHERE id = {$data['id']};";
makeQuery($query);

sessionPut('user_id', $data['id']);
sessionPut('user_session_hash', $hash);

makeResponse(ERR_OK);
