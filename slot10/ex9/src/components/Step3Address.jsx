import Form from "react-bootstrap/Form";

function Step3Address() {
  return (
    <Form>
      <h5 className="mb-3">
        <i className="bi bi-geo-alt-fill me-2 text-primary"></i>Address Information
      </h5>

      <Form.Group className="mb-3" controlId="street">
        <Form.Label>Street *</Form.Label>
        <Form.Control id="street" type="text" placeholder="Enter your street address" />
        <div className="invalid-feedback" id="err-street" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City *</Form.Label>
        <Form.Control id="city" type="text" placeholder="Enter your city" />
        <div className="invalid-feedback" id="err-city" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="state">
        <Form.Label>State *</Form.Label>
        <Form.Control id="state" type="text" placeholder="Enter your state/province" />
        <div className="invalid-feedback" id="err-state" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="zip">
        <Form.Label>Zip Code *</Form.Label>
        <Form.Control id="zip" type="text" placeholder="Enter your zip/postal code" />
        <div className="invalid-feedback" id="err-zip" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="country">
        <Form.Label>Country *</Form.Label>
        <Form.Select id="country">
          <option value="">Select a country</option>
          <option>Vietnam</option>
          <option>Australia</option>
          <option>United States</option>
          <option>Japan</option>
        </Form.Select>
        <div className="invalid-feedback" id="err-country" />
      </Form.Group>
    </Form>
  );
}

export default Step3Address;
