import express from "express"
import { signup } from "../contranllers/users_contraller.js"
import { login ,logout} from "../contranllers/users_contraller.js"
const router=express.Router()

router.post("/signup",signup)//done
router.post("/login",login)//done
router.post("/logout",logout)//done

export default router;