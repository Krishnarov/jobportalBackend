import { Application } from "../models/application_model.js";
import Job from "../models/jobs_model.js";

export const applyJob = async (req, res) => {
  try {
    const userid = req.id;

    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job id is requird", userid });
    }
    const exestingapplicantes = await Application.findOne({
      job: jobId,
      applicant: userid,
    });

    if (exestingapplicantes) {
      return res
        .status(400)
        .json({ message: "you have allradey applied for this ob" });
    }
    const jobextst = await Job.findById(jobId);
    if (!jobextst) {
      return res.status(404).json({ message: "job not found" });
    }

    const newapplicatent = await Application.create({
      job: jobId,
      applicant: userid,
    });
    jobextst.applications.push(newapplicatent._id);
    await jobextst.save();

    return res.status(200).json({ message: "job applide successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

export const getallaplidjob = async (req, res) => {
  try {
    const userid = req.id;
    const application = await Application.find({ applicant: userid })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({ message: "No Applications" });
    }
    return res.status(200).json({ message: "geting success", application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getaplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findOne({ _id: jobId })
    .populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }
    return res.status(200).json({ message: "getting successfull", job });
  } catch (error) {
    return res.status(500).json({ message: "internal server error :-", error });
  }
};

export const updatestatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({ message: "application not found" });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({ message: "status update successfull " });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
