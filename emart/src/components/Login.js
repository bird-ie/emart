import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import "./Login.css";

export default function Login() {
  const userid = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUrl = "https://crystalsolutions.com.pk/emart/web/login.php";

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function UserLogin() {
    // Client-side validation
    if (!userid.current.value || !password.current.value) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);

    const data = {
      userid: userid.current.value,
      password: password.current.value,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(loginUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.data.error === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          login(response.data.user);
          navigate("/dashboard");
        } else {
          setErrorMessage("Invalid login credentials");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("An error occurred. Please try again.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Row className="d-flex mt-5 justify-content-center align-content-center w-100">
        <Col className="bg-white col-10 col-sm-10 col-md-8 col-lg-8 col-xl-6 text-center text-black border border-secondary p-4 rounded-4">
          <h2 className="mt-4 mb-4">Login</h2>
          <div>
            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Control
                ref={userid}
                className="rounded-5 p-3"
                type="text"
                placeholder="Enter your id"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={password}
                className="rounded-5 p-3"
                type="password"
                placeholder="Password"
                autoComplete="on"
              />
            </Form.Group>
            <Button
              onClick={UserLogin}
              style={{ border: "1px solid white" }}
              className="btn-login-1 w-100 rounded-5 p-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </Button>
            {/* <Button
            className="btn-login-1 w-100 rounded-5 p-3"
            style={{ border: "1px solid white" }}
            href="/emart/dashboard">
              Login
            </Button> */}
          </div>
          <div className="mt-2 mb-5">
            {errorMessage && (
              <div className="text-danger mt-3">{errorMessage}</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
