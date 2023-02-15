import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

function SearchContainer() {
  const [localSearch, setLocalSearch] = useState('');

  const {
    isLoading,
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
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLocalSearch('')
    clearFilters();
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
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
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
