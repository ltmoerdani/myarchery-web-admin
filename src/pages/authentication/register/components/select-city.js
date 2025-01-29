import React from "react";
import AsyncSelect from "react-select/async";
import { stringUtil } from "utils";
import { SelectContainer } from "./styles";

const SelectCity = ({ value, onChange, error }) => {
  const loadOptions = async (inputValue) => {
    try {
      const params = new URLSearchParams({ name: inputValue });
      const response = await fetch(`/api/cities?${params}`);
      const data = await response.json();

      return data.map((city) => ({
        value: city.id,
        label: stringUtil.capitalize(city.name),
      }));
    } catch (error) {
      console.error("Error loading cities:", error);
      return [];
    }
  };

  return (
    <SelectContainer>
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
    </SelectContainer>
  );
};

export default SelectCity;
