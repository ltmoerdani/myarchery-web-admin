import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { PageWrapper } from "components/ma/page-wrapper";
import { Container } from "reactstrap";
import { BreadcrumbDashboard } from "../../components/breadcrumb";

const ContentLayoutWrapper = ({ children, pageTitle, navbar }) => {
  const { state } = useLocation();
  const backButtonURL = state?.from || "/dashboard";
  return (
    <PageWrapper title={pageTitle ? `${pageTitle} | MyArchery.id` : "MyArchery.id"}>
      {navbar}
      <Container fluid>
        <BreadcrumbDashboard to={backButtonURL}>Kembali</BreadcrumbDashboard>
        <StyledPageWrapper>{children}</StyledPageWrapper>
      </Container>
    </PageWrapper>
  );
};

const StyledPageWrapper = styled.div`
  margin: 2.5rem 0;

  @media (min-width: 768px) {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default ContentLayoutWrapper;
