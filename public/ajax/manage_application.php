<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//functions
function createApplication($data)
{
  $title = $data['title'];
  $price = $data['price'];
  $authorId = $data['author_id'];
  $description = $data['description'];

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
    $data = json_decode(methodGet('data', 'post'), JSON_OBJECT_AS_ARRAY);
    createApplication($data);
		break;
	case 'delete-application':
		$applicationId = methodGet('applicationid', 'post');
		deleteApplication($applicationId);
		break;
}
