import React, { useState } from "react";
import { PageWrapper } from "components/ma/page-wrapper";
import { FormField } from "components/ma/form-field";

// availity-reactstrap-validation
import { Link } from "react-router-dom"

import { Container, Row, Col, CardBody, Card, Button } from "reactstrap"

// import images
import profileImg from "../../../assets/images/profile-img.png"
import logoImg from "../../../assets/images/logo.svg"
import avatar from "../../../assets/images/users/avatar-man.png"

const LockScreen = () => {
  const [formData, setFormData] = useState({ password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <PageWrapper title="Lock Screen">
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="6" xl="5">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Lock screen</h5>
                        <p>Enter your password to unlock the screen!</p>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="user-thumb text-center mb-4">
                        <img
                          src={avatar}
                          className="rounded-circle img-thumbnail avatar-md"
                          alt="thumbnail"
                        />
                        <h5 className="font-size-15 mt-3">Maria Laird</h5>
                      </div>

                      <FormField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter Password"
                        required
                      />

                      <div className="text-end">
                        <Col xs="12" className="text-end">
                          <button className="btn btn-primary w-md" type="submit">
                            Unlock
                          </button>
                        </Col>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Not you ? return{" "}
                  <Link
                    to="/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                      Sign In{" "}
                  </Link>{" "}
                </p>
                <p>
                  © 2021 MyArchery. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PageWrapper>
  )
}
export default LockScreen
