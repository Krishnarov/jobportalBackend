import express from "express";
import { upload } from "../midilwairs/mutler.js";
import { regcompanise,getOnecompani,updatecompani,getCompany,deletecompany} from "../contranllers/companise_contraller.js";
import isAuthenticated from "../midilwairs/isAuthenticated.js"

const routes = express.Router();

routes.post("/regcompanise",isAuthenticated,regcompanise)  //done

routes.post("/getonecompanise/:id",isAuthenticated,getOnecompani) //done
routes.get("/getCompany",isAuthenticated,getCompany)//done

routes.put("/updatecompani/:id",isAuthenticated,upload.single("logo"),updatecompani)//done
routes.delete("/deletecompany/:id",isAuthenticated,deletecompany)//done
export default routes;
