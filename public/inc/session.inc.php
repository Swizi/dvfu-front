<?php

function sessionPut($cell, $value)
{
  if (session_status() != 2) session_start();

  $_SESSION[$cell] = $value;
}
function sessionGet($cell)
{
  if (session_status() != 2) session_start();

  return (isset($_SESSION[$cell])) ? $_SESSION[$cell] : makeResponse(ERR_SESSION_DATA_DOES_NOT_EXIST);
}
