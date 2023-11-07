<?php
require_once("../lib/logicc.php");
$dataRequest = trim(file_get_contents("php://input"));
$arDataRequest = json_decode($dataRequest, true);
switch ($arDataRequest["action"]) {
    case 'search':
        $data = searchProducts_logic($arDataRequest["valueTosearch"]);
        echo json_encode($data );
        break;

    case 'getAllCategory':
        $data = getData_AllCategory_Logic();
        echo json_encode($data);
        break;
    default: echo "action probablemente mal escrito.";
       
}
?>
