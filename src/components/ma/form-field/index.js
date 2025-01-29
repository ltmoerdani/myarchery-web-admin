import React from "react";
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";

const FormField = ({ 
  name, 
  label, 
  type = "text", 
  value, 
  onChange, 
  error,
  placeholder,
  required 
}) => {
  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        invalid={!!error}
        placeholder={placeholder}
        required={required}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export { FormField };
