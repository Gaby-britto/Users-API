const UserRepository = require("../service/UserRepository");

var email = "test@gmail.com";
var password = "test123@";

// Read -> Lê todas as ocorrências da Base de dados
exports.listAllUsers = async (req, res) => {
    try {
        const users = await UserRepository.listAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.toString(), message: "ERRO INTERNO DO SERVER" });
    }
}

// Create -> Cria um novo user
exports.createUser = async (req, res) => {
    if (req.body.password === password && req.body.email === email) {
        try {
            const user = await UserRepository.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.toString(), message: "ERRO INTERNO DO SERVER" });
        }
    } else {
        res.status(400).json({ error: "Invalid email or password" });
    }
}

