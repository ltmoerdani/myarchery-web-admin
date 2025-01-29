import React from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { PageWrapper } from "components/ma/page-wrapper";

const ContentLayoutWrapper = ({ children, pageTitle, navbar }) => {
  return (
    <PageWrapper title={pageTitle}>
      {navbar}
      <Container fluid>
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

export { ContentLayoutWrapper };
