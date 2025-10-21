import React, { useReducer, useMemo } from "react";
import { Container, Card, Form, Button, Alert, Modal, Row, Col } from "react-bootstrap";

const REGEX = {
  username: /^[a-zA-Z0-9_.]{3,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

// --- Reducer Logic ---
const initialState = {
  data: { username: "", email: "", password: "", confirm: "" },
  err: {},
  toast: false,
  modal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        data: { ...state.data, [action.name]: action.value },
        err: { ...state.err, [action.name]: "" },
      };
    case "SET_ERROR":
      return { ...state, err: { ...state.err, [action.name]: action.message } };
    case "RESET":
      return initialState;
    case "TOAST_ON":
      return { ...state, toast: true };
    case "TOAST_OFF":
      return { ...state, toast: false };
    case "MODAL_ON":
      return { ...state, modal: true };
    case "MODAL_OFF":
      return { ...state, modal: false };
    default:
      return state;
  }
}

export default function RegistrationForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, err, toast, modal } = state;

  const check = (name, val, pass) => {
    let msg = "";
    if (name === "username")
      msg = val.trim() !== val
        ? "Không được chứa khoảng trắng."
        : !REGEX.username.test(val)
        ? "Username ≥3 ký tự (chữ, số, _, .)"
        : "";
    if (name === "email" && !REGEX.email.test(val)) msg = "Email không hợp lệ.";
    if (name === "password" && !REGEX.password.test(val))
      msg = "Mật khẩu yếu (8+, hoa, thường, số, ký tự đặc biệt).";
    if (name === "confirm" && val !== pass) msg = "Mật khẩu không khớp.";

    dispatch({ type: "SET_ERROR", name, message: msg });
  };

  const valid = useMemo(
    () =>
      Object.values(data).every((v) => v.trim()) &&
      Object.values(err).every((e) => !e) &&
      data.password === data.confirm &&
      REGEX.username.test(data.username) &&
      REGEX.email.test(data.email) &&
      REGEX.password.test(data.password),
    [data, err]
  );

  const submit = (e) => {
    e.preventDefault();
    if (!valid)
      return Object.entries(data).forEach(([k, v]) =>
        check(k, v, data.password)
      );

    dispatch({ type: "TOAST_ON" });
    dispatch({ type: "MODAL_ON" });
    setTimeout(() => dispatch({ type: "TOAST_OFF" }), 2500);
  };

  const reset = () => dispatch({ type: "RESET" });

  const handleInputChange = (name, value) =>
    dispatch({ type: "CHANGE_FIELD", name, value });

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={5} xl={4} className="mx-auto">
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <Card.Title className="text-center text-primary mb-4">
                <h4>Đăng ký tài khoản 📝</h4>
              </Card.Title>

              <Form onSubmit={submit}>
                {/* Username Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={data.username}
                    placeholder="Chỉ chữ, số,... (≥3 ký tự)"
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    onBlur={(e) =>
                      check("username", e.target.value, data.password)
                    }
                    isInvalid={!!err.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="example@mail.com"
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    onBlur={(e) => check("email", e.target.value, data.password)}
                    isInvalid={!!err.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={data.password}
                    placeholder="Mật khẩu mạnh (8+, Hoa, Thường, Số, ĐB)"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={(e) =>
                      check("password", e.target.value, data.password)
                    }
                    isInvalid={!!err.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={data.confirm}
                    placeholder="Nhập lại mật khẩu"
                    onChange={(e) =>
                      handleInputChange("confirm", e.target.value)
                    }
                    onBlur={(e) => check("confirm", e.target.value, data.password)}
                    isInvalid={!!err.confirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-danger"
                    onClick={reset}
                    className="px-4"
                  >
                    Reset
                  </Button>

                  <Button
                    variant={valid ? "success" : "outline-success"}
                    type="submit"
                    disabled={!valid}
                    className="px-4"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast */}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <Alert show={toast} variant="success" className="shadow" transition>
          ✅ Submitted successfully!
        </Alert>
      </div>

      {/* Modal */}
      <Modal show={modal} onHide={() => dispatch({ type: "MODAL_OFF" })} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Đăng ký thành công 🎉
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-light p-3 rounded">
            <p>
              <strong>Username:</strong> {data.username}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Password:</strong> *** (ẩn)
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => dispatch({ type: "MODAL_OFF" })}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
