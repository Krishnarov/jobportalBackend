import Company from "../models/companise.js";
import path from "path"
// export const getcompanise = async (req, res) => {
//   try {
//     const companise = await Company.find();
//     res.status(200).json(companise);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log("companise contraller error", error);
//   }
// };


export const regcompanise = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ Message: "companay name is requried" });
    }
    const isexistcompany=await Company.findOne({name})
    if(isexistcompany){
      return res.status(400).json({message:"company is allrady existe"})
    }

    if (!req.id) {
      return res.status(400).json({ message: "User ID is required", });
    }
    const newcompani = new Company({
      name,
      regTime: new Date(),
      userId:req.id
    });

    await newcompani.save();
    res
      .status(200)
      .json({ message: "compain cerate seccessfull ", newcompani });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ Message: "internal server error" ,error});
  }
};
export const getOnecompani = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is requried" });
    }
    const compain = await Company.findById(id);
    if (!compain) {
      return res.status(404).json({ message: "company not found" });
    }
    res.status(200).json({ message: "featching seccessfull ", compain });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  } 
};
export const updatecompani = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, website, location} = req.body;
    const logopath=req.file?.filename || null
    // const logopath=req.file ? req.file.path :null
    if (!name || !description || !website || !location) {
      return res.status(400).json({ message: "all filleds are required" });
    }
    const updated=await Company.findByIdAndUpdate(id,{
        name,
        description,
        location,
        logo:logopath,
        website,
        updateTime:new Date()
    },{new:true})
    if(!updated){
        res.status(404).json({message:"compani not found"})
    }
    res.status(200).json({message:"update seccessfull"})
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};


export const getCompany=async(req,res)=>{
  try {
    const userId=req.id
    console.log(userId);
    
    const companay=await Company.find({userId})

    if (!companay){
      return res.status(404).json({message:"company not found"})
    }
    res.status(200).json({message:"fetching company seccess",companay:companay,})
    
  } catch (error) {
    return res.status(500).json({message:"internl server error",error})
  }
}

export const deletecompany=async(req,res)=>{

try {
  const {id}=req.params
  if(!id)return res.status(400).json({message:"id is requierd"})
  
    const deleted=await Company.findByIdAndDelete(id)
    res.status(200).json({message:"company delete sueccessfull"})
  } catch (error) {
  console.log(error);
  
  res.status(500).json({message:"internal server error"})
}

}