<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//functions
function getUserInfo()
{
	$id = sessionGet('user_id');
	$query = "SELECT * FROM users WHERE id = {$id};";
	$data = mqagd($query);
	$info = [
	  'login' => $data['login'],
	  'fname' => $data['firstname'],
	  'lname' => $data['lastname'],
	  'tel' => $data['telephone_number'],
		'smLink' => $data['sm_link']
	];

	makeResponse(ERR_OK, $info);
}
function changeUserInfo($changes)
{
	$id = sessionGet('user_id');

	$query = "UPDATE users SET ";
  foreach ($changes as $change) {
		$query = $query . $change[0] . " = '" . $change[1] . "', ";
  }
	$query{strlen($query)-2} = '^';
	$query = str_replace('^', '', $query);
	$query .= "WHERE id = {$id};";

	makeQuery($query);
	makeResponse(ERR_OK);
}

//define
$targets = ['get-user', 'change-user'];

//input data
$target = methodGet('target', 'post');
if (!in_array($target, $targets)) {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
switch ($target) {
	case 'get-user':
		getUserInfo();
		break;
	case 'change-user':
		$changes = json_decode(methodGet('changes', 'post'), JSON_OBJECT_AS_ARRAY);
		changeUserInfo($changes);
		break;
}
