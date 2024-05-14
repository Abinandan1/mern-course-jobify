const FormRow = ({ type, name, defaultValue, labelText, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
      />
    </div>
  );
};
export default FormRow;
