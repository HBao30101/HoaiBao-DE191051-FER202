import Form from "react-bootstrap/Form";

function Step1About() {
  return (
    <Form>
      <h5 className="mb-3">
        <i className="bi bi-person-fill me-2 text-primary"></i>About Information
      </h5>

      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name *</Form.Label>
        <Form.Control id="firstName" type="text" placeholder="Enter first name" />
        <div className="invalid-feedback" id="err-firstName" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name *</Form.Label>
        <Form.Control id="lastName" type="text" placeholder="Enter last name" />
        <div className="invalid-feedback" id="err-lastName" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email *</Form.Label>
        <Form.Control id="email" type="email" placeholder="Enter your email" />
        <div className="invalid-feedback" id="err-email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone *</Form.Label>
        <Form.Control id="phone" type="text" placeholder="Enter phone number" />
        <div className="invalid-feedback" id="err-phone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="age">
        <Form.Label>Age *</Form.Label>
        <Form.Control id="age" type="number" placeholder="Enter your age" />
        <div className="invalid-feedback" id="err-age" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="avatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control id="avatar" type="file" />
      </Form.Group>
    </Form>
  );
}

export default Step1About;
