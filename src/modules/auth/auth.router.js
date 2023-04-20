import {Router} from 'express'
import * as authController from  './controller/auth.js'
const router = Router();


router.get("/" , authController.getAuthModule)
router.post('/signupAdmin' , authController.signup)
router.post('/loginAdmin' , authController.login)

// user//

router.get("/" , authController.getAuthModule)
router.post('/signup' , authController.signupAdmin)
router.post('/login' , authController.loginAdmin)

export default  router