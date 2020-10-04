<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//functions
function createApplication($title, $description, $price)
{
  $authorId = sessionGet('user_id');
  date_default_timezone_set('UTC');
  $publicationDate = date(DATE_RFC822);
  $query = "INSERT INTO applications (title, price, author_id, description, publication_date) VALUES ('{$title}', '{$price}', '{$authorId}', '{$description}', '{$publicationDate}');";
  makeQuery($query);

  makeResponse(ERR_OK);
}

function deleteApplication($applicationId)
{
  $query = "DELETE FROM applications WHERE id={$applicationId};";
  makeQuery($query);

  makeResponse(ERR_OK);
}

//define
$targets = ['create-application', 'delete-application'];

//input data
$target = methodGet('target', 'post');
if (!in_array($target, $targets)) {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
switch ($target) {
	case 'create-application':
    $applicationTitle = methodGet('title', 'post');
    $applicationDescription = methodGet('description', 'post');
    $applicationPrice = methodGet('price', 'post');
    createApplication($applicationTitle, $applicationDescription, $applicationPrice);
		break;
	case 'delete-application':
		$applicationId = methodGet('application_id', 'post');
		deleteApplication($applicationId);
		break;
}
