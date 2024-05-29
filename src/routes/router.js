const { Router } = require('express');
const ControllerUser = require('../controller/ControllerUser');

const router = Router();

router.post("/user", ControllerUser.createUser);
router.get("/users", ControllerUser.listAllUsers);


module.exports = router;
