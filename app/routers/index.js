const express = require('express');

const router = express.Router()

const _userController = require('../controllers/estudiante/estudiante.controller')

// Definimos las rutas correspondientes a cada método del controlador
router
    .get("/estudiante", _userController.getestudiante)
    .post("/estudiante", _userController.createestudiante)
    .put("/estudiante/:id", _userController.updateestudiante)
    .delete("/estudiante/:id", _userController.deleteestudiante);
    
module.exports = router;