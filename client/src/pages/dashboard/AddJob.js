import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

function AddJob() {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext();

  const sumbitHandler = (event) => {
    event.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
        editJob();
        return;
    }
    createJob();
    // displayAlert();
    // clearValues();
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit job" : "Add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={changeHandler}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={changeHandler}
          />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            value={jobLocation}
            handleChange={changeHandler}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={changeHandler}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            handleChange={changeHandler}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={sumbitHandler}
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
