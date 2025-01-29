import React from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import stringUtil from "utils/stringUtil";
import { useFieldValidation } from "utils/hooks/field-validation";

import { Col, Label } from "reactstrap";

const CurrencyInput = ({
  name,
  id = stringUtil.createRandom(),
  label,
  value,
  onChange,
  horizontal = false,
  disabled = false,
  readOnly,
}) => {
  const { errors, handleFieldValidation } = useFieldValidation(name);

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    onChange(value);
  };

  const formatValue = (val) => {
    return new Intl.NumberFormat('id-ID').format(val);
  };

  const handleBlur = () => {
    handleFieldValidation(value);
  };

  if (horizontal) {
    return (
      <div className="row">
        {label && (
          <Label htmlFor="horizontal-Input" className="col-sm-6 col-form-label">
            {label}
          </Label>
        )}
        <Col sm={6}>
          <input
            id={id}
            value={formatValue(value)}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${_.get(errors, name) ? "is-invalid" : ""}`}
            disabled={disabled}
            readOnly={readOnly}
          />
          {_.get(errors, name)?.map((message) => (
            <div className="invalid-feedback" key={message}>
              {message}
            </div>
          ))}
        </Col>
      </div>
    );
  }

  return (
    <div>
      {label && <Label>{label}</Label>}
      <input
        id={id}
        value={formatValue(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-control ${_.get(errors, name) ? "is-invalid" : ""}`}
        disabled={disabled}
      />
      {_.get(errors, name)?.map((message) => (
        <div className="invalid-feedback" key={message}>
          {message}
        </div>
      ))}
    </div>
  );
};

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  horizontal: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default CurrencyInput;
