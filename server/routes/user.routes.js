const {Router} = require ('express')
const router=Router()
const Usuario=require('../controllers/user.controller')

router.post('/crear', Usuario.crearUser)
router.post('/login', Usuario.login)

module.exports=router