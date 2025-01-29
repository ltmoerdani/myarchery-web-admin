import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { Formik, Form, Field } from "formik"
import logo from "../../../assets/images/logo.svg"
import profile from "../../../assets/images/profile-img.png"

const RecoverPassword = () => {
  const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }
    return errors
  }

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle your form submission logic here
    console.log(values)
    setSubmitting(false)
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <HeaderSection />
                <CardBody className="pt-0">
                  <LogoSection />
                  <div className="p-2">
                    <div className="alert alert-success text-center mb-4" role="alert">
                      Enter your Email and instructions will be sent to you!
                    </div>
                    <Formik
                      initialValues={{ email: "" }}
                      validate={validate}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched, isSubmitting }) => (
                        <Form className="form-horizontal mt-4">
                          <div className="mb-3">
                            <Field
                              name="email"
                              type="email"
                              className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                              placeholder="Enter email"
                            />
                            {errors.email && touched.email && (
                              <div className="invalid-feedback">{errors.email}</div>
                            )}
                          </div>
                          <div className="mt-4">
                            <button
                              className="btn btn-primary w-100 waves-effect waves-light"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Reset
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
              <FooterSection />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const HeaderSection = () => (
  <div className="bg-primary bg-soft">
    <Row>
      <Col xs={7}>
        <div className="text-primary p-4">
          <h5 className="text-primary"> Reset Password</h5>
          <p>Re-Password with MyArchery.</p>
        </div>
      </Col>
      <Col xs={5} className="align-self-end">
        <img src={profile} alt="" className="img-fluid" />
      </Col>
    </Row>
  </div>
)

const LogoSection = () => (
  <div>
    <Link to="dashboard">
      <div className="avatar-md profile-user-wid mb-4">
        <span className="avatar-title rounded-circle bg-light">
          <img src={logo} alt="" className="rounded-circle" height="34" />
        </span>
      </div>
    </Link>
  </div>
)

const FooterSection = () => (
  <div className="mt-5 text-center">
    <p>
      Remember It ?{" "}
      <Link to="pages-login" className="fw-medium text-primary">
        {" "}
        Sign In here
      </Link>{" "}
    </p>
    <p>
      © {new Date().getFullYear()} MyArchery. Crafted with{" "}
      <i className="mdi mdi-heart text-danger"></i> by Themesbrand
    </p>
  </div>
)

export default RecoverPassword
