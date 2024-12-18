import express from "express";
import { applyJob ,getallaplidjob,getaplicants,updatestatus} from "../contranllers/Application_contraller.js";
import isAuthenticated from "../midilwairs/isAuthenticated.js";

const route = express.Router();

route.post("/aplidjob/:id", isAuthenticated, applyJob);//user
route.post("/allaplidjob", isAuthenticated, getallaplidjob);
route.post("/getaplicants/:id", isAuthenticated, getaplicants);
route.put("/updatestatus/:id", isAuthenticated, updatestatus);

export default route;
