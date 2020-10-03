<?php

function stringGenerate($length)
{
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890";
  $string = '';

	for ($i = 1; $i <= $length; $i++) {
		$string .= $chars[rand(0, strlen($chars)-1)];
	}

	return $string;
}

function getItemCode($string)
{
  $code = '';
	$open = -1;
	$close = -1;

	for ($i = 0; $i <= strlen($string)-1; $i++) {
		if ($string[$i] == "(") {
			$open = $i;
		} elseif ($string[$i] == ")") {
			$close = $i;
		}
	}

  if ($open == -1 || $close == -1 || ($close-$open-1) <= 4) {
  	return "NULL";
  } else {
		for ($i = $open+1; $i <= $close-1; $i++) {
			$code .= $string[$i];
		}
	}

	return $code;
}

function getFirst($string)
{
	$first = '';
  for ($i = 0; $i <= strlen($string)-1; $i++) {
  	if ($string[$i] == ';') {
  		return $first;
  	} else {
			$first .= $string[$i];
		}
  }
}

function getCode($segCount = 3)
{
  $code = '?';

  for ($i = 1; $i <= $segCount; $i++) {
    $code .= stringGenerate(5);
    if ($i < $segCount) {
      $code .= '-';
    }
  }

  return $code;
}

function getIds($string)
{
	$id = '';
	$ids = [];

	for ($i = 0; $i <= strlen($string)-1; $i++) {
		if ($string[$i] != ',') {
			$id .= $string[$i];
		} else {
			$ids[] = intval($id);
			$id = '';
		}
	}

	return $ids;
}

function addId($string, $id)
{
	$string .= $id . ',';
	// $string .= ',';

	return $string;
}
