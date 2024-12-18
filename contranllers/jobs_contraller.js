import mongoose from "mongoose";
import Jobs from "../models/jobs_model.js";
import Company from "../models/companise.js";
// console.log(Jobs.schema.paths);

// export const getjobs = async (req, res) => {
//   try {
//     const jobs = await Jobs.find();
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(`getjobs erroe :- ${error}`);
//   }
// };

export const postjob = async (req, res) => {
  try {
    const {
      title,
      companyId,
      address,
      dec,
      salary,
      skills,
      poster,
      logo,
      position,
      jobType,
      experience,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !companyId ||
      !address ||
      !dec ||
      !salary ||
      !skills ||
      !position ||
      !jobType ||
      !experience
    ) {
      return res.status(400).json({ message: "all fildes are required" });
    }
    const jobpost = new Jobs({
      title,
      company: companyId,
      address,
      dec,
      salary: Number(salary),
      skills: skills.split(","),

      poster,
      logo,
      position,
      jobType,
      experience,
      createdBy: userId,
    });
    await jobpost.save();
    res.status(200).json({
      message: "user created successfull",
      jobpost,
    });
  } catch (error) {
    res.status(500).json({ message: "internat server error" });
    console.log("error", error);
  }
};

export const getalljob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { dec: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Jobs.find(query)
      .populate({
        path: "company",
      })
    if (!jobs) {
      return res.status(400).json({ message: "jobs not found" });
    }

    res.status(200).json({ message: "feaching seccessfull ", jobs });
  } catch (error) {console.log(error);
  
    res.status(500).json({ message: "internal server error" ,error});
  }
};

export const deletajob = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Job ID is required" });
  }
  const deletadjob = await Jobs.findByIdAndDelete(id);
  if (!deletadjob) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json({ message: "Job deleted successfully" });

  try {
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

export const editjob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, address, dec, salary, skills, time, poster, logo } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    const editedjob = await Jobs.findByIdAndUpdate(id, {
      title,
      company,
      address,
      dec,
      salary,
      skills,
      time,
      poster,
      logo,
    });
    if (!editedjob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getjobbyid = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const joddata = await Jobs.findById(id);
    if (!joddata) {
      return res.status(404).json({ message: "job data not found" });
    }
    res.status(200).json({ message: "job featching seccess", joddata });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getadminjob = async (req, res) => {
  try {
    const adminid = req.id;
    const jobs = await Jobs.find({ createdBy: adminid }).populate({
        path: "company",
        // select: "name location",
    }).sort({ createdAt: -1 }); 
    if (!jobs) {
      return res.status(400).json({ message: "job not found" });
    }
    return res.status(200).json({ message: "feching seccessfull", jobs });
  } catch (error) {
    res.status(500).json({ message: "internt server erroe", error });
  }
};
