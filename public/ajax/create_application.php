<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//functions
function createApplication($data)
{
  $query = "INSERT INTO applications (type, price, author_id, time_duration, publication_date) VALUES ('{$type}', '{$price}', '{$authorId}', '{$timeDuration}', '{$publicationDate}');";
  makeQuery($query);
}

function deleteApplication($applicationId)
{
  $query = "DELETE FROM applications WHERE id={$applicationId};";
  makeQuery($query);
}

//define
$targets = ['delete-application', 'create-application'];

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
