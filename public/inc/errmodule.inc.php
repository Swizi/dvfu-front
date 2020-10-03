<?php

define("ERR_OK", 0);
define("ERR_REQUEST_GOAL_IS_NOT_CORRECT", 1);
define("ERR_REQUIRED_DATA_IS_NOT_DEFINED", 2);
define("ERR_LOGIN_IS_NOT_UNIQUE", 3);
define("ERR_NO_SUCH_LOGIN", 4);
define("ERR_UNCORRECT_PASSWORD", 5);
define("ERR_AUTH_FALSE", 6);
define("ERR_SESSION_DATA_DOES_NOT_EXIST", 7);
define("ERR_INVALID_METHOD_TYPE", 8);

function makeResponse($errorCode, $data = array())
{
  $response = array('status' => $errorCode);
  $response += $data;
  echo json_encode($response);
  die();
}
