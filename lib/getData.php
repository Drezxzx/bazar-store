<?php
require "conection.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

function get_data(){
$dataOBJ = conection();

return $dataOBJ;
}

function searchProducts_getData($valueToSearch){
    $dateReturn = [
    ];
    $dataOBJ = get_data();
    $valueToSearch = "/$valueToSearch/i";
    foreach ($dataOBJ["products"] as $value) {
        if (preg_match($valueToSearch, $value["title"])) { 
            array_push($dateReturn, $value);
        }
    }
    return $dateReturn;
}

function getDetailsProducts_getData($id){
    $dataOBJ = get_data();
    $datareturn = [];
    foreach ($dataOBJ["products"] as  $product) {
        if ($product["id"] == $id ) {
            array_push($datareturn, $product);
        }
    }
    return $datareturn;
}
function getData_AllCategory_Data(){
    $dataOBJ = get_data();
    $dataReturn = [];    
    foreach ($dataOBJ["products"] as $value) {
        array_push($dataReturn, $value["category"]);
    }
    return $dataReturn; 
}
?>
