<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../controller/RelatorioHomeController.php';

$relatorioManager = new RelatorioHomeController();

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getRelatorioHome":
        if ($id !== null) {
            echo "Ação 'getRelatorioHome' não aceita um ID";
        } else {
            $users = $relatorioManager->getRelatorioHome();
            echo json_encode($users); 
        }
        break;
    
    case "getPodiumVendedor":
        if ($id !== null) {
            echo "Ação 'getRelatorioHome' não aceita um ID";
        } else {
            $users = $relatorioManager->getPodiumVendedor();
            echo json_encode($users); 
        }
        break;
        
    default:
        echo "Rota não encontrada";
}
