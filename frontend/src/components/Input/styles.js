import styled from "styled-components";

export const StyledInputWrapper = styled.div`
  padding: calc(0.5em - 1px) calc(0.75em - 1px);
`;

export const StyledLabel = styled.label`
  border-width: 1px;
  border-style: solid;
  border-color: gray;
  border-radius: 0.375em;

  padding: calc(0.5em - 1px) calc(0.75em - 1px);
`;

export const StyledInput = styled.input`
  outline: none;
  border: none;
  padding-left: calc(0.75em - 1px);
  font-size: 1rem;
  line-height: 1.5;

  &::placeholder {
    color: #d0d0d0;
  }
`;
