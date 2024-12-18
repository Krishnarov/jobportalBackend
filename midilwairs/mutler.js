import multer from "multer";
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const folderHai=(dir)=>{
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir,{recursive:true})
}
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const uploadepath=path.join(__dirname,"../public")
        folderHai(uploadepath)
        cb(null,uploadepath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    }
})
export const upload=multer({storage})