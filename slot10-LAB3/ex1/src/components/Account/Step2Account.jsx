import Form from "react-bootstrap/Form";

function Step2Account() {
  return (
    <Form>
      <h5 className="mb-3">
        <i className="bi bi-lock-fill me-2 text-primary"></i>Account Information
      </h5>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username *</Form.Label>
        <Form.Control id="username" type="text" placeholder="Enter username" />
        <div className="invalid-feedback" id="err-username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password *</Form.Label>
        <Form.Control id="password" type="password" placeholder="Enter password" />
        <div className="invalid-feedback" id="err-password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password *</Form.Label>
        <Form.Control id="confirmPassword" type="password" placeholder="Confirm password" />
        <div className="invalid-feedback" id="err-confirmPassword" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="secretQuestion">
        <Form.Label>Secret Question *</Form.Label>
        <Form.Select id="secretQuestion">
          <option value="">Select a question</option>
          <option>What is your first pet's name?</option>
          <option>What is your mother's maiden name?</option>
          <option>What city were you born in?</option>
        </Form.Select>
        <div className="invalid-feedback" id="err-secretQuestion" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="answer">
        <Form.Label>Answer *</Form.Label>
        <Form.Control id="answer" type="text" placeholder="Enter your answer" />
        <div className="invalid-feedback" id="err-answer" />
      </Form.Group>
    </Form>
  );
}

export default Step2Account;
