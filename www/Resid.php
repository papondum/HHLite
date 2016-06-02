<?php
header('Access-Control-Allow-Origin: *');
$user=$_REQUEST['username'];
$pass=$_REQUEST['password'];
$json = '{"owner":{
        "email":"'.$user.'",
        "password":"'.$pass.'"}}' ;

$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => "http://hungryhub.com:3000/api/owner/restaurant/show",
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

