const fs = require('fs'); // Módulo para manipulação do sistema de arquivos
const path = require('path'); // Módulo para manipulação de caminhos de arquivos
const bcrypt = require('bcrypt'); // Módulo para criptografia de senhas
const jwt = require('jsonwebtoken'); // Módulo para geração e verificação de tokens JWT

// Definição do nome e caminho do arquivo onde os dados dos usuários serão armazenados
const fileName = 'user.json';
const filePath = path.join(__dirname, '..', 'database', fileName);

class UserRepository {
    
    // Função para escrever dados no arquivo de usuários
    static async writeUserFile(users) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error(`Error writing to file: ${err}`);
                    reject(err); // Rejeita a Promise em caso de erro
                } else {
                    console.log(`Data written to file: ${filePath}`);
                    resolve(users); // Resolve a Promise em caso de sucesso
                }
            });
        });
    }

    // Função para listar todos os usuários
    static async listAllUsers() {
        try {
            const users = await this.getUsers(); // Obtém todos os usuários
            return users;
        } catch (err) {
            console.error(`Error listing users: ${err}`);
            throw err; // Lança uma exceção em caso de erro
        }
    }

    // Função para obter os dados dos usuários a partir do arquivo
    static async getUsers() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', async (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        await this.writeUserFile([]); // Cria um arquivo vazio se não existir
                        resolve([]); // Resolve a Promise com um array vazio
                    } else {
                        console.error(`Error reading file: ${err}`);
                        reject(err); // Rejeita a Promise em caso de erro
                    }
                } else {
                    resolve(JSON.parse(data)); // Resolve a Promise com os dados dos usuários
                }
            });
        });
    }

    // Função para criar um novo usuário
    static async createUser(user) {
        try {
            const users = await this.getUsers(); // Obtém todos os usuários
            user.id = users.length + 1; // Define o ID do novo usuário
            users.push(user); // Adiciona o novo usuário ao array
            await this.writeUserFile(users); // Escreve os dados atualizados no arquivo
            return user;
        } catch (err) {
            console.error(`Error creating user: ${err}`);
            throw err; // Lança uma exceção em caso de erro
        }
    }

    // Função para obter um usuário pelo ID
    static async getUserById(id) {
        try {
            const users = await this.getUsers(); // Obtém todos os usuários
            const user = users.find(u => u.id === parseInt(id)); // Encontra o usuário pelo ID
            return user;
        } catch (err) {
            console.error(`Error getting user by id ${id}: ${err}`);
            throw err; // Lança uma exceção em caso de erro
        }
    }
}

// // Função para autenticar um usuário
// async function authenticateUser(req, res, next) {
//     const email = req.body.email; // Obtém o email do corpo da requisição
//     const password = req.body.password; // Obtém a senha do corpo da requisição
//     let loadedUser;

//     try {
//         // Busca o usuário pelo email
//         const user = await UserRepository.getUsers().then(users => users.find(u => u.email === email));
//         if (!user) {
//             const error = new Error("Falha de validação");
//             error.statusCode = 422;
//             throw error; // Lança um erro se o usuário não for encontrado
//         }

//         loadedUser = user;
//         // Compara a senha fornecida com a senha armazenada
//         const passIsEqual = await bcrypt.compare(password, user.password);

//         if (!passIsEqual) {
//             const error = new Error("Email ou senha inválida...");
//             error.statusCode = 401;
//             throw error; // Lança um erro se as senhas não coincidirem
//         }

//         // Gera um token JWT para o usuário
//         const token = jwt.sign(
//             {
//                 email: loadedUser.email,
//                 userId: loadedUser.id.toString()
//             },
//             "chave@12345678", // Chave secreta para assinatura do token
//             { expiresIn: "8h" } // Define o tempo de expiração do token
//         );

//         // Retorna a resposta com o token gerado
//         return res.status(200).json({
//             message: "Usuário logado com sucesso!",
//             token: token,
//         });
//     } catch (error) {
//         console.error(error);
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error); // Passa o erro para o próximo middleware
//     }
 

module.exports = { UserRepository, authenticateUser }; // Exporta o repositório de usuários e a função de autenticação
