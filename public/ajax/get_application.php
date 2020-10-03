<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//functions
function getApplicationList()
{
  $query = "SELECT title, price, publication_date FROM applications;";
  $applicationList = mqagd($query, 'array');

  $data = [];
  foreach ($applicationList as $application) {
    if ($application['customer_id'] != -1 && $application['customer_id'] != sessionGet('user_id')) {
      $data[] = null;
    } else {
      $data[] = $application;
    }
  }

  makeResponse(ERR_OK, $data);
}

function getApplication($applicationId)
{
  $query = "SELECT * FROM applications WHERE id={$applicationId};";
  $applicationInfo = mqagd($query);

  $authorId = $applicationInfo['author_id'];
  $query = "SELECT firstname, lastname FROM users WHERE id = {$authorId};";
  $data = mqagd($query);
  $applicationInfo['author_fname'] = $data['firstname'];
  $applicationInfo['author_lname'] = $data['lastname'];

  if ($applicationInfo['customer_id'] == sessionGet('user_id')) {
    $applicationInfo['is_accepted'] = true;
  } else {
    $applicationInfo['is_accepted'] = false;
  }

  makeResponse(ERR_OK, $applicationInfo);
}

//define
$targets = ['get-application-list', 'get-application'];

//input data
$target = methodGet('target', 'post');
if (!in_array($target, $targets)) {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
switch ($target) {
	case 'get-application-list':
    getApplicationList();
		break;
	case 'get-application':
		$applicationId = methodGet('applicationid', 'post');
		getApplication($applicationId);
		break;
}
