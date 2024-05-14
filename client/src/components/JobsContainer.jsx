import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../wrappers/JobsContainer";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const { jobs, totalJobs, numberOfPages, currentPage } = useAllJobsContext();

  console.log({ jobs, totalJobs, numberOfPages, currentPage });
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 ? "s" : ""} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numberOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
