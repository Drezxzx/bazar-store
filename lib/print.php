<?php
require "logicc.php";

function searchProducts_Print($valueToSearch)
{
    $dataReturn = searchProducts_logic($valueToSearch);
    $result = "";
    foreach ($dataReturn as $value) {
        
            $result .= " <div class='product'>
            <a href='views/detailproduct.php?id={$value["id"]}'>
            <div class='img-product'><img class='width100' src='{$value["thumbnail"]}' alt=''></div>
            <div class='info-product'>
            <h3 class='title-search'>{$value["title"]}</h3>
            <p class='description'>{$value["description"]}</p>
            <span class='price-val'>
            <h4> {$value["price"]}</h4> <span> {$value["rating"]} </span
            </span>
            </a>
            </div>
            </div>";
        
    }
    return $result;
}

function getDetailsProducts_print($id)
{
    $dataReturn = getDetailsProducts_Logic($id);
    $result = "";
    foreach ($dataReturn as $key => $product) {
        $result .= " <div class='product'>
            <div class='img-group'>
            <div class='principal-img'><img class='width100' src='{$product["thumbnail"]}' alt=''></div>
            <div class='second-imgs'>";
        foreach ($product["images"] as $key => $value) {
            if ($product["thumbnail"] != $value) {
                $result .= "<div class='others-img'><img class='width100' src='{$value}' alt=''></div>";
            }
        }
        $result .= "</div></div>";
        $result .="<h3 class='title'>{$product["title"]} - {$product["brand"]}</h3>";
        $result .= "<div class='info-product'>
        <div class='price-val'>
        <div class='span'><h4 class='price'>{$product["price"]}€</h4><p class='stock'>{$product["stock"]} Disponible</p></div> <span class='rating'>" . getNumbersOfResult($product["rating"]) . "</span>
                </div>
                </div>
               <div class='div-description'><p class='description-details'>{$product["description"]}</p></div>
               <div class='button-buy'><button id='button-buy'>Comprar</button> </div>
        </div></div>";
    
}
    return $result;
}

function getNumbersOfResult($number = null)
{
    if ($number < 5) {
        $number = floor($number);
    }
    $blackstart = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>';
    $yellowstart = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" style="fill: rgba(254, 213, 1, 1);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>';
    $obj = [
        "1" => "{$yellowstart}{$blackstart}{$blackstart}{$blackstart}{$blackstart}",
        "2" => "{$yellowstart}{$yellowstart}{$blackstart}{$blackstart}{$blackstart}",
        "3" => "{$yellowstart}{$yellowstart}{$yellowstart}{$blackstart}{$blackstart}",
        "4" => "{$yellowstart}{$yellowstart}{$yellowstart}{$yellowstart}{$blackstart}",
        "5" => "{$yellowstart}{$yellowstart}{$yellowstart}{$yellowstart}{$yellowstart}"
    ];
    return "{$obj["{$number}"]}";
}

?>