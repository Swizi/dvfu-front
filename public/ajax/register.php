<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'registration') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}
$fname = methodGet('fname', 'post');
$lname = methodGet('lname', 'post');
$login = strtolower(methodGet('login', 'post'));
$password = getHash(methodGet('password', 'post'));
$tel = methodGet('tel', 'post');
$smLink = methodGet('smlink', 'post');

//checking login uniqueness
$query = "SELECT id FROM users WHERE login = '{$login}';";
$data = mqagd($query);
if (!empty($data)) {
  makeResponse(ERR_LOGIN_IS_NOT_UNIQUE);
}

//success
$hash = getHash(stringGenerate(10));
$query = "INSERT INTO users (firstname, lastname, telephone_number, social_media_link, login, password, session_hash) VALUES ('{$fname}', '{$lname}', '{$tel}', '{$smLink}', '{$login}', '{$password}', '{$hash}');";
makeQuery($query);
$query = "SELECT id FROM users WHERE login = '{$login}';";
$id = mqagd($query)['id'];

sessionPut('user_id', $id);
sessionPut('user_session_hash', $hash);

makeResponse(ERR_OK);
