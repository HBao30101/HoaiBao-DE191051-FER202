import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import "./Filter.css";

export default function Filter() {
  return (
    <Card className="filter-card">
      <h5 className="filter-title">🎬 Filter</h5>
      <Row className="align-items-center gy-3">
        {/* Search */}
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search movie..."
            className="filter-input"
          />
        </Col>

        {/* Filter */}
        <Col md={4}>
          <Form.Select className="filter-select">
            <option value="">Filter by Year</option>
            <option value="<=2000">≤ 2000</option>
            <option value="2001-2015">2001 - 2015</option>
            <option value=">2015"> 2015</option>
          </Form.Select>
        </Col>

        {/* Sorting */}
        <Col md={4}>
          <Form.Select className="filter-select">
            <option value="">Sort by...</option>
            <option value="yearAsc">Year ↑</option>
            <option value="yearDesc">Year ↓</option>
            <option value="titleAsc">Title A → Z</option>
            <option value="titleDesc">Title Z → A</option>
            <option value="durationAsc">Duration ↑</option>
            <option value="durationDesc">Duration ↓</option>
          </Form.Select>
        </Col>
      </Row>
    </Card>
  );
}
