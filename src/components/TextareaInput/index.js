import React from "react";
import { Input, Label } from "reactstrap";
import stringUtil from "utils/stringUtil";

const TextareaInput = ({
  name,
  id = stringUtil.createRandom(),
  label,
  value,
  onChange,
  error,
}) => {
  const handleChange = (e) => {
    if (onChange)
      onChange({
        key: name,
        value: e.target.value,
      });
  };

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        type="textarea"
        id={id}
        maxLength="225"
        rows="3"
        placeholder={label}
        value={value}
        onChange={handleChange}
        className={`${error?.[name] ? "is-invalid" : ""}`}
      />
      {error?.[name]?.map(message => (
        <div className="invalid-feedback" key={message}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default TextareaInput;
