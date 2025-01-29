import * as React from "react";
import styled from "styled-components";
import { GeneralService } from "services";

import AsyncSelect from "react-select/async";

const FieldSelectWrapper = styled.div`
  .field-label {
    display: inline-block;
    color: var(--ma-gray-600);
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 4px;

    .field-required {
      color: var(--ma-red);
    }
  }
`;

const customSelectStyles = {
  valueContainer: (provided) => ({
    ...provided,
    padding: "8px 12px",
  }),
  input: (provided) => ({
    ...provided,
    color: "#6a7187",
    fontSize: 14,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#6a7187",
    fontSize: 14,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6a7187",
    fontSize: 14,
    opacity: 0.6,
  }),
};

const computeCustomStylesWithValidation = (errors) => {
  if (errors?.length) {
    return {
      ...customSelectStyles,
      control: (provided) => ({
        ...provided,
        border: "solid 1px var(--ma-red)",
      }),
    };
  }
  return customSelectStyles;
};

const FETCHING_LIMIT = 30;

function FieldSelectCity({ label, value, onChange, error }) {
  const loadOptions = async (inputValue) => {
    try {
      const params = new URLSearchParams({ name: inputValue });
      const response = await fetch(`/api/cities?${params}`);
      const data = await response.json();

      return data.map((city) => ({
        value: city.id,
        label: city.name,
      }));
    } catch (error) {
      console.error("Error loading cities:", error);
      return [];
    }
  };

  return (
    <FieldSelectWrapper>
      {label && <label className="field-label">{label}</label>}
      <AsyncSelect
        value={value}
        onChange={onChange}
        loadOptions={loadOptions}
        placeholder="Pilih kota"
        className={error ? "is-invalid" : ""}
        defaultOptions
        cacheOptions
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </FieldSelectWrapper>
  );
}

export default FieldSelectCity;
