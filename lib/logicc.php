<?php
require "getData.php";
function searchProducts_logic($valueToSearch){
$dateReturn = searchProducts_getData($valueToSearch);

    return  
             $dateReturn ;
}

function getDetailsProducts_Logic($id){
  $dataReturn =  getDetailsProducts_getData($id);
    return $dataReturn;
}

function getData_AllCategory_Logic(){
    $dataReturn = getData_AllCategory_Data();
    
    return $dataReturn; 
}
?>