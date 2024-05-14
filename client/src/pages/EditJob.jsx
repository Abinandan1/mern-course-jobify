import { Form, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await customFetch(`/jobs/${id}`);
      return response.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    try {
      await queryClient.ensureQueryData(singleJobQuery(id));
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { id } = params;
    try {
      const response = await customFetch.patch(`/jobs/${id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job updated successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
          ></FormRow>
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
          ></FormRow>
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          ></FormRow>
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
