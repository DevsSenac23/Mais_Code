<?php
include "../controller/clienteController.php";

$clienteController = new Clientecontroller();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = $_REQUEST["acao"];

switch ($acao) {
    case "updateClientByID":
        if ($id !== null) {
            $users = $clienteController->updateClientByID($id);
            echo json_encode($users);
        } else {
            echo "Ação 'updateClientByID' necessita de um ID";
        }
        break;


    case "createNewCliente":
        if ($id != null) {
            echo "Ação createNewCliente não aceitar um ID";
        } else {
            $mensagem = $clienteController->createNewCliente();
            echo json_encode($mensagem);
        }
        break;
    default:
        // Ação não suportada.
        return json_encode(["error" => "Ação não suportada."]);
}