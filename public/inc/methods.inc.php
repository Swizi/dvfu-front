<?php

function methodGet($cell, $methodType)
{
  switch ($methodType) {
    case 'get':
      if (!isset($_GET[$cell])) {
        makeResponse(ERR_REQUIRED_DATA_IS_NOT_DEFINED);
      }
      return $_GET[$cell];
      break;
    case 'post':
      if (!isset($_POST[$cell])) {
        makeResponse(ERR_REQUIRED_DATA_IS_NOT_DEFINED);
      }
      return $_POST[$cell];
      break;
    default:
      makeResponse(ERR_INVALID_METHOD_TYPE);
      break;
  }
}
