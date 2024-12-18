import express from "express";
import {postjob,deletajob,editjob,getjobbyid,getalljob,getadminjob} from "../contranllers/jobs_contraller.js"
import isAuthenticated from "../midilwairs/isAuthenticated.js";
const routes = express.Router();


routes.post("/postjob",isAuthenticated, postjob);//done
routes.get("/getalljob",getalljob);//user
routes.post("/getadminjob",isAuthenticated, getadminjob);
routes.delete("/deletejob/:id",isAuthenticated,deletajob)
routes.put("/updatejob/:id",isAuthenticated,editjob)
routes.post("/getjob/:id",isAuthenticated, getjobbyid);

export default routes;
