import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

function SearchContainer() {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();

  const searchHandler = (e) => {
    if (isLoading) {
      return;
    }
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    clearFilters();
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={searchHandler}
          />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={searchHandler}
            list={["all", ...statusOptions]}
          />

          <FormRowSelect
            labelText="Job Type"
            name="searchType"
            value={searchType}
            handleChange={searchHandler}
            list={["all", ...jobTypeOptions]}
          />

          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={searchHandler}
            list={sortOptions}
          />
          
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={submitHandler}
          >Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
