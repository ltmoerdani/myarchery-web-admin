import * as React from "react";
import styled from "styled-components";

const FieldSelectRadioWrapper = styled.div`
  display: flex;

  .field-radio-label {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 500;

    &.no-options {
      color: var(--ma-gray-400);
    }

    .field-radio-input {
      margin-right: 0.5rem; /* 8px, dari 1rem = 16px di :root */
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

function FieldSelectRadio({ name, options }) {
  return (
    <FieldSelectRadioWrapper>
      {options && options.length ? (
        options.map((option) => (
          <label key={option.value} className="field-radio-label">
            <input className="field-radio-input" type="radio" name={name} value={option.value} />
            {option.label || option.value}
          </label>
        ))
      ) : (
        <div className="field-radio-label no-options">No options</div>
      )}
    </FieldSelectRadioWrapper>
  );
}

export default FieldSelectRadio;
