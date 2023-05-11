import React from "react";
import Button from "react-bootstrap/Button";

const FormButton = (props) => {
  return (
    <Button
      className={props.klass}
      size="lg"
      type="submit"
      onClick={props.action}
    >
      {props.name}
    </Button>
  );
};

export default FormButton;
