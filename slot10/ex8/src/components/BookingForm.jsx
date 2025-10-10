import React from "react"
import { Form, InputGroup, Button, Row, Col, Alert } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

const BookingForm = () => {
  return (
    <div
      className="p-4 border rounded shadow-sm bg-white"
      style={{ maxWidth: "550px", margin: "40px auto" }}
    >
      {/* alert */}
      <Alert variant="warning" className="text-center fw-bold mb-4">
        Form đặt vé máy bay
      </Alert>

      <Form>
        {/* Họ tên */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Họ tên</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person"></i>
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Họ tên" />
            <InputGroup.Text>vnd</InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-muted">
            Phải nhập 5 ký tự, in hoa...
          </Form.Text>
        </Form.Group>

        {/* Địa chỉ */}
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ" />
          <Form.Text className="text-muted">
            Phải nhập 5 ký tự, in hoa...
          </Form.Text>
        </Form.Group>

        {/* Đi từ - Đến */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formFrom">
              <Form.Label>Đi từ</Form.Label>
              <Form.Select>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>TP. Hồ Chí Minh</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formTo">
              <Form.Label>Đến</Form.Label>
              <Form.Select>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>TP. Hồ Chí Minh</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Chọn chiều đi */}
        <Form.Group className="mb-3" controlId="formDirection">
          <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Đi"
              name="direction"
              id="radioOneWay"
            />
            <Form.Check
              inline
              type="radio"
              label="Về"
              name="direction"
              id="radioReturn"
            />
          </div>
        </Form.Group>

        {/* Nút đặt vé */}
        <Button type="submit" variant="primary" className="w-100 fw-bold">
          Đặt vé
        </Button>
      </Form>
    </div>
  )
}

export default BookingForm
