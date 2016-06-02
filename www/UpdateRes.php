<?php
header('Access-Control-Allow-Origin: *');
$user=$_REQUEST['username'];
$pass=$_REQUEST['password'];
$resid=$_REQUEST['resID'];
$id=$_REQUEST['id'];
$arrived=$_REQUEST['arrived'];
$nshow=$_REQUEST['no_show'];
$json = '{"owner":{"email":"'.$user.'","password":"'.$pass.'"}, 
		"reservation":{"id":"'.$id.'","restaurant_id":'.$resid.',
         "arrived":"'.$arrived.'", "no_show": "'.$nshow.'"}}' ;

$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => "http://hungryhub.com:3000/api/owner/reservations/update",
    CURLOPT_NOBODY => false,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $json,
    CURLOPT_HTTPHEADER => array(
        "Content-type: application/json"
        
    ),
));
$response = curl_exec($ch);



if ($response && curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200)
    echo $response  ;
    
else
    echo $response ;

?>

