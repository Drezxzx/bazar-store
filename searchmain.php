<?php
require "lib/print.php";
if (isset($_GET["valueToSearch"])) {
    $valueToSearch = $_GET["valueToSearch"];
    $result = searchProducts_Print($valueToSearch);
    require "views/search.php";
}
?>