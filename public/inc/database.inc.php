<?php

function makeQuery($query)
{
  $connect = pg_connect("host=ec2-18-211-86-133.compute-1.amazonaws.com dbname=d7envj91ne6v2o user=dcijdgrwshiasp port=5432 password=789efc0745abd256835ecbb6009cececeedb133cfdcc84b106f7549432e52c49");

  $result = pg_query($connect, $query);
  pg_close($connect);
  return $result;
}

function getData($queryRes, $resType)
{
  if ($resType == 'array') {
    $result = [];
    while ($row = pg_fetch_assoc($queryRes)) {
      array_push($result, $row);
    }
    return $result;
  } elseif ($resType == 'row') {
	  return pg_fetch_assoc($queryRes);
  }
}

function mqagd($query, $resType = 'row')
{
  return getData(makeQuery($query), $resType);
}
