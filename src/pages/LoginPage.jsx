import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import formImage from "../assets/formImage1.jpg";
import { loginAPI } from "../API/Api.js"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 async function handleFormSubmit(e) {
  e.preventDefault();
  setError("");

  try {
    const response = await loginAPI({ email, password });

    if (response.token) {
      alert("Login successful!");
      navigate("/");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  } catch (err) {
    setError(err.message || "An error occurred.");
  }
}


  return (
    <>
      <Navbar />
      <Container
        fluid
        className="py-5"
        style={{ backgroundColor: "#0D0D0D", minHeight: "100vh" }}
      >
        <Row className="justify-content-center align-items-center">
          <Col md={8} lg={6}>
            <Row
              className="rounded overflow-hidden"
              style={{
                backgroundColor: "#1a1a1a",
                boxShadow: "0 0 10px rgba(193, 154, 107, 0.2)",
                color: "#E0E0E0",
              }}
            >
              <Col md={6} className="p-0 d-none d-md-block">
                <img
                  src={formImage}
                  alt="login visual"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </Col>
              <Col md={6} className="p-4">
                <h3 className="mb-4 text-center" style={{ color: "#C19A6B" }}>
                  Login
                </h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={{ color: "#E0E0E0" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        backgroundColor: "#262626",
                        color: "#fff",
                        border: "1px solid #444",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label style={{ color: "#E0E0E0" }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        backgroundColor: "#262626",
                        color: "#fff",
                        border: "1px solid #444",
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: "#C19A6B",
                      borderColor: "#C19A6B",
                      color: "#0D0D0D",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Button>
                </Form>

                <div className="mt-3 text-center" style={{ color: "#C19A6B" }}>
                  <span>New user? </span>
                  <Link to="/RegisterPage" style={{ color: "#F5F5F5" }}>
                    Register here
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
