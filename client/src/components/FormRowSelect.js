function FormRowSelect({labelText, name, value, handleChange, list}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((listItemValue, index) => {
          return (
            <option key={index} value={listItemValue}>
              {listItemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
