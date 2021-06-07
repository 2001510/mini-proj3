const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get)
    .post(AuthController.checkAuth, [body('nome').isString(),
        body('profissao').isString(),
        body('anosExperiencia').isInt()
    ], ExpertController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.delete);

module.exports = router;