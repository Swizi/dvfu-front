<?php

function getHash($string)
{
  return password_hash($string, PASSWORD_DEFAULT);
}

function sessionHashVerify($id, $hash)
{
  $query = "SELECT session_hash FROM users WHERE id = {$id};";
  $sessionHash = mqagd($query)['session_hash'];
  if ($hash != $sessionHash) {
    return false;
  } else {
    return true;
  }
}

function checkAuth()
{
  $id = sessionGet('user_id');
  $hash = sessionGet('user_session_hash');
  if (!sessionHashVerify($id, $hash)) {
    makeResponse(ERR_AUTH_FALSE);
  }
}
