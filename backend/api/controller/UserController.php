<?php
include "../database.php"; 

class Usercontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllUsers()
    {
        $sql = "SELECT * FROM usuarios";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    public function createDefaultUserIfNoneExist()
{
    $users = $this->getAllUsers();

    if (empty($users)) {
        $nome = 'Administrador';
        $email = 'admin@maiscode.com';
        $senha = 'admin';
        $cargo_id = 1;

        $hashedPassword = hash('sha256', $senha);

        try {
            $sql = "INSERT INTO usuarios (nome, cargo_id, senha, email) VALUES (:nome, :cargo_id, :senha, :email)";
            $db = $this->conn->prepare($sql);

            $db->bindParam(':nome', $nome);
            $db->bindParam(':cargo_id', $cargo_id);
            $db->bindParam(':senha', $hashedPassword);
            $db->bindParam(':email', $email);

            if ($db->execute()) {
                return json_encode(['status' => 1, 'message' => 'Novo usuário Administrador criado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Erro ao criar novo usuário.']);
            }
        } catch (\Exception $e) {
            return json_encode(['status' => 0, 'message' => 'Erro ao inserir novo usuário: ' . $e->getMessage()]);
        }
    } else {
        return json_encode(['status' => 1, 'message' => 'Usuários já existem, não foi necessário criar um novo.']);
    }
}

    public function getAllCargo()
    {
        $sql = "SELECT * FROM cargos";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    public function validacaoLogin()
    {
        $user = json_decode(file_get_contents("php://input"));
    
        $hashedPassword = hash('sha256', $user->senha);

        $sql = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":email", $user->email);
        $db->bindParam(":senha", $hashedPassword);
        $db->execute();
        
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
    
        if ($users) {
            return $users;
        } else {
            return 0;  
        }
    }
    


    // Método para buscar usuário por ID
    public function getUserById(int $id)
    {
        try {
            $sql = "SELECT * FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $user = $db->fetch(PDO::FETCH_ASSOC);
            return $user;
        } catch (\Exception $th) {
            echo "Erro ao buscar o usuario: " . $th->getMessage();
            return null;
        }
    }

    // Alteração do método para criar usuário com SHA-256
    public function createNewUserGestao()
    {
        try {
            $user = json_decode(file_get_contents("php://input"));

            if (!$user || !isset($user->nome) || !isset($user->cargo_id) || !isset($user->senha) || !isset($user->email)) {
                return json_encode(['status' => 0, 'message' => 'Dados incompletos.']);
            }

            $userExists = $this->checkUserExists($user->email);
            if ($userExists) {
                return json_encode(['status' => 0, 'message' => 'Usuário já existe.']);
            }

            // Gerar o hash SHA-256 da senha
            $hashedPassword = hash('sha256', $user->senha); 

            $sql = "INSERT INTO usuarios (nome, cargo_id, senha, email) VALUES (:nome, :cargo_id, :senha, :email)";
            $db = $this->conn->prepare($sql);

            $db->bindParam(":nome", $user->nome);
            $db->bindParam(":cargo_id", $user->cargo_id);
            $db->bindParam(":senha", $hashedPassword);
            $db->bindParam(":email", $user->email);

            if ($db->execute()) {
                $resposta = ['status' => 1, 'message' => 'Sucesso.'];
            } else {
                $resposta = ['status' => 0, 'message' => 'Erro ao cadastrar'];
            }

            return json_encode($resposta);
        } catch (\Exception $e) {
            error_log('Erro ao criar usuário: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao criar usuário.']);
        }
    }

    private function checkUserExists(string $email)
    {
        $query = "SELECT COUNT(*) FROM usuarios WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }

    // Método para atualizar dados do usuário
    public function updateUserById(int $id)
    {
        try {
            $user = json_decode(file_get_contents('php://input'));

            $userExists = $this->checkUserExistsById($id);
            if (!$userExists) {
                return json_encode(['status' => 0, 'message' => 'Usuário não encontrado.']);
            }

            // Se a senha foi alterada, aplicar o hash SHA-256
            $hashedPassword = hash('sha256', $user->senha);

            $sql = "UPDATE usuarios SET nome = :nome, cargo_id = :cargo_id, senha = :senha, email = :email, status_usuario = :status_usuario WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':cargo_id', $user->cargo_id);
            $stmt->bindParam(':senha', $hashedPassword);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':status_usuario', $user->status_usuario);

            if ($stmt->execute()) {
                return json_encode(['status' => 1, 'message' => 'Registro atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o registro.']);
            }
        } catch (\Exception $e) {
            error_log('Erro ao atualizar usuário: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar usuário.']);
        }
    }

    private function checkUserExistsById(int $id)
    {
        $query = "SELECT COUNT(*) FROM USUARIOS WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
}
