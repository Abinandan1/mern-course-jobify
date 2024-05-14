import day from "dayjs";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search)
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  if (jobStatus && jobStatus !== "all") queryObject.jobStatus = jobStatus;
  if (jobType && jobType !== "all") queryObject.jobType = jobType;
  let sortType;
  switch (sort) {
    case "newest":
      sortType = "-createdAt";
      break;
    case "oldest":
      sortType = "createdAt";
      break;
    case "a-z":
      sortType = "position";
      break;
    case "z-a":
      sortType = "-position";
      break;
    default:
      sortType = "-createdAt";
  }
  // PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const jobs = await Job.find(queryObject)
    .sort(sortType)
    .skip(skip)
    .limit(limit);
  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ numberOfPages, currentPage: page, totalJobs, jobs });
};
// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};
// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
// UPDATE JOB
export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg: "job modified", updatedJob });
};
// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

// SHOW STATS
export const showStats = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  // let monthlyApplications = [];
  // for (let i = 0; i <= 5; i++) {
  //   monthlyApplications.push({
  //     date: day(Date.now()).subtract(i, "month").format("MMM YY"),
  //     count: 0,
  //   });
  // }
  // monthlyApplications.reverse();
  // const stats = jobs.reduce(
  //   (acc, curr) => {
  //     monthlyApplications.map((month) => {
  //       if (month.date === day(curr.createdAt).format("MMM YY")) month.count++;
  //     });
  //     acc[curr.jobStatus] = acc[curr.jobStatus] + 1;
  //     return acc;
  //   },
  //   { pending: 0, interview: 0, declined: 0 }
  // );
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});
  const finalStats = {
    pending: stats.pending || 0,
    declined: stats.declined || 0,
    interview: stats.interview || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { month, year },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ stats: finalStats, monthlyApplications });
};
