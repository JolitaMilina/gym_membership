import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Input = (props) => {
  const { text, value, placeholder, type, name, onChange } = props;
  return (
    <div>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          {text}
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default Input;
