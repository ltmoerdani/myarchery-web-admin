import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as AuthenticationStore from "store/slice/authentication";
import toastr from "toastr";
import { useSubmitRegister } from "./hooks/submit-register";

import { PageWrapper } from "components/ma/page-wrapper";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import { FormField } from "components/ma/form-field";
import { ButtonBlue, ButtonGhostBlue, LoadingScreen } from "components/ma";
import { ProcessingToast, toast } from "./components/processing-toast";
import { SelectInfoSource } from "./components/select-info-source";
import { SelectCity } from "./components/select-city";
import { SelectProvince } from "./components/select-province";
import { AlertSuccess } from "./components/alert-registration-success";

import IconArrowLeft from "components/ma/icons/mono/arrow-left";

import myachery from "assets/images/myachery/logo 3.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(AuthenticationStore.getAuthenticationStore);
  const [screen, setScreen] = useState(0);
  const [provinceId, setProvinceId] = useState();
  const [formStep1, setFormStep1] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [formStep2, setFormStep2] = useState({
    province: "",
    city: "",
    questionnaire_source: "",
    questionnaire_motive: "",
    questionnaire_event_name: "",
    questionnaire_event_description: "",
  });
  const [errors, setErrors] = useState({});
  const { submit, isLoading, isSuccess, data: submitSuccessData } = useSubmitRegister();

  const handleChange = (step) => (e) => {
    const { name, value } = e.target;
    if (step === 1) {
      setFormStep1({ ...formStep1, [name]: value });
    } else {
      setFormStep2({ ...formStep2, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formStep1.name) newErrors.name = "Name is required";
    if (!formStep1.email) newErrors.email = "Email is required";
    if (!formStep1.phone) newErrors.phone = "Phone is required";
    if (!formStep1.password) newErrors.password = "Password is required";
    if (formStep1.password !== formStep1.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    return newErrors;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    const errors = validateStep1();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setScreen(1);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const payload = _makePayload(formStep1, formStep2);
    submit(payload, {
      onError: (errors) => {
        if (!errors.length) {
          return;
        }
        errors.forEach((message) => toastr.error(message));
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    window.scrollTo(0, 100);
  }, [screen]);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  const renderRegistrationScreen = () => {
    if (screen === 0) {
      return (
        <div className="p-2" key="step-1">
          <form onSubmit={handleStep1Submit}>
            <FormField
              name="name"
              label="Nama Penyelenggara"
              value={formStep1.name}
              onChange={handleChange(1)}
              error={errors.name}
              placeholder="Masukkan nama"
              required
            />
            <FormField
              name="email"
              label="Email"
              value={formStep1.email}
              onChange={handleChange(1)}
              error={errors.email}
              placeholder="Masukkan email (digunakan untuk masuk)"
              type="email"
              required
            />
            <FormField
              name="phone"
              label="Nomor Telepon"
              value={formStep1.phone}
              onChange={handleChange(1)}
              error={errors.phone}
              placeholder="Masukkan nomor telepon (nomor WhatsApp)"
              type="text"
              required
            />
            <FormField
              name="password"
              label="Kata Sandi"
              value={formStep1.password}
              onChange={handleChange(1)}
              error={errors.password}
              type="password"
              required
              placeholder="Masukkan kata sandi"
            />
            <FormField
              name="password_confirmation"
              label="Konfirmasi Kata Sandi"
              value={formStep1.password_confirmation}
              onChange={handleChange(1)}
              error={errors.password_confirmation}
              type="password"
              required
              placeholder="Masukkan ulang kata sandi di atas"
            />
            <div className="mt-3 d-grid">
              <ButtonBlue type="submit">Selanjutnya</ButtonBlue>
            </div>
          </form>
        </div>
      );
    }
    
    if (screen === 1) {
      return (
        <div className="p-2" key="step-2">
          <div className="mb-3">
            <ButtonBack flexible onClick={() => setScreen(0)}>
              <IconArrowLeft size="16" />
            </ButtonBack>
          </div>

          <form onSubmit={handleStep2Submit}>
            <FormField
              name="province"
              label="Provinsi"
              value={formStep2.province}
              onChange={handleChange(2)}
              error={errors.province}
              required
            />
            <FormField
              name="city"
              label="Kota"
              value={formStep2.city}
              onChange={handleChange(2)}
              error={errors.city}
              required
            />
            <FormField
              name="questionnaire_source"
              label="Dari mana Anda mengetahui MyArchery?"
              value={formStep2.questionnaire_source}
              onChange={handleChange(2)}
              error={errors.questionnaire_source}
              required
            />
            <FormField
              name="questionnaire_motive"
              label="Mengapa Anda ingin menggunakan MyArchery?"
              value={formStep2.questionnaire_motive}
              onChange={handleChange(2)}
              error={errors.questionnaire_motive}
              required
            />
            <FormField
              name="questionnaire_event_name"
              label="Event terdekat apa yang ingin Anda selenggarakan?"
              value={formStep2.questionnaire_event_name}
              onChange={handleChange(2)}
              error={errors.questionnaire_event_name}
              required
            />
            <FormField
              name="questionnaire_event_description"
              label="Deskripsikan event yang akan Anda selenggarakan?"
              value={formStep2.questionnaire_event_description}
              onChange={handleChange(2)}
              error={errors.questionnaire_event_description}
              required
            />
            <div className="mt-3 d-grid">
              <ButtonBlue type="submit">Buat Akun</ButtonBlue>
            </div>
          </form>
        </div>
      );
    }

    return <div className="p-2">Tidak ada screen</div>;
  };

  return (
    <PageWrapper title="Register">
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <ProcessingToast />
        <LoadingScreen loading={isLoading} />
        <AlertSuccess
          isSuccess={isSuccess}
          onConfirm={() => {
            submitSuccessData && dispatch(AuthenticationStore.register());
          }}
        />
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-light p-4">
                        <h5 className="text-light">Daftar MyArchery.id</h5>
                        <p>
                          Get your free MyArchery.id <br />
                          account now.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={myachery} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  {renderRegistrationScreen()}
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Sudah punya akun?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PageWrapper>
  );
};

function _makePayload(formStep1, formStep2) {
  return {
    // step 1
    name_organizer: formStep1.name,
    email: formStep1.email,
    password: formStep1.password,
    password_confirmation: formStep1.password_confirmation,
    phone_number: formStep1.phone,
    // step 2
    province_id: formStep2.province,
    city_id: formStep2.city,
    intro: {
      where: formStep2.questionnaire_source,
      why: formStep2.questionnaire_motive,
      what: formStep2.questionnaire_event_name,
      description: formStep2.questionnaire_event_description,
    },
  };
}

const ButtonBack = styled(ButtonGhostBlue)`
  > *:nth-child(1) {
    transform: translateX(-0.75rem);
    transition: transform 0.15s ease-in-out;
  }

  &:hover > *:nth-child(1) {
    transform: translateX(0);
  }

  > *:nth-child(2) {
    visibility: hidden;
    transition: visibility 0.35s ease-in-out;
  }

  &:hover > *:nth-child(2) {
    visibility: visible;
  }
`;

export default Register;
