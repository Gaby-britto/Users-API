const UserRepository = require("../service/UserRepository");

exports.createUser = async (req, res) => {
        try {
            const user = await UserRepository.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.toString(), message: "ERRO INTERNO DO SERVER" });
        }
}



exports.listAllUsers = async (req, res) => {
    try {
        const users = await UserRepository.listAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.toString(), message: "ERRO INTERNO DO SERVER" });
    }
}

