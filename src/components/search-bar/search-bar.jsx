import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SearchBar({ value, onChange }) {
    console.log("search value", value)
    console.log("search onChange", onChange)

  return (
    <Container className="m-5">
      <Row className="justify-content-center">
        <Col sm={4} >
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={value} // Set the value from the prop
              onChange={onChange} // Handle input change using the prop function
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}