const { Router } = require('express');
const ControllerUser = require('../controller/ControllerUser');

const router = Router();

router.post("/users", ControllerUser.createUser);
router.get("/users", ControllerUser.listAllUsers);


module.exports = router;
