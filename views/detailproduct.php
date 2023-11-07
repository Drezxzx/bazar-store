<?php
require "../lib/print.php";
if (isset($_GET["id"])) {
    $idproduct= $_GET["id"];
    $detailProduct =getDetailsProducts_print($idproduct);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../public/js/index.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="../public/css/common.css">
    <link rel="stylesheet" href="../public/css/index.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>detail</title>
</head>
<body>
<header>
        <div class="img-search"><a href="../main.php"><img class="width100" src="../public/img/shopping-store.png" alt="Logo de tienda"></a></div>
        <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg>    
        <input type="searc" placeholder="laptops, smartPhones, ..." id="input-bar"></div>
        </header>
        <div class="information">
        <div class="info"></div>
        <div class="related"></div>
        </div>
    <main >
    <?php
         echo $detailProduct;  
    ?></main>
</body>
</html>