const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(AuthController.checkAuth, [body('nome').isString(),
        body('categoria').isString(),
        body('email').isString()
    ], SponsorController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.delete);

module.exports = router;