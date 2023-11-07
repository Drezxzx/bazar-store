<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
function conection(){
// URL de la API
$api_url = 'https://raw.githubusercontent.com/midudev/pruebas-tecnicas/main/pruebas/02-bazar-universal/products.json';
// Realiza una solicitud GET a la API
$response = file_get_contents($api_url);
// Verifica si la solicitud fue exitosa
if ($response === false) {
    die('No se pudo acceder a la API');
}
$data = json_decode($response, true);
return $data;
}
// Decodifica la respuesta JSON en un array asociativo
?>