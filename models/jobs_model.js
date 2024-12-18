import mongoose from "mongoose";

const jobsSchama = new mongoose.Schema(
  {
    title: { type: String, required: true },
    time: String,
    address: { type: String, required: true },
    dec: String,
    skills: [{ type: String }],
    salary: { type: Number },
    experience: String,
    jobType: { type: String },
    position: { type: Number, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
  },
  { timestamps: true }
);
const Jobs = mongoose.model("Jobs", jobsSchama);
export default Jobs;
