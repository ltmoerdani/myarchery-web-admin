import * as React from "react";
import styled from "styled-components";

import { Container } from "reactstrap";
import { ProcessingToast } from "components/ma/processing-toast";
import { ErrorBoundary } from "components/ma/error-boundary";
import { Breadcrumb } from "./components/breadcrumb";
import PropTypes from "prop-types";
import { setPageTitle } from "utils/title";

function PageWrapper({
  children,
  pageTitle,
  unconstrained = false,
  navbar,
  sidebar,
  breadcrumbText,
  breadcrumbLink,
  before,
  after,
}) {
  const commonLayoutProps = {
    breadcrumbText: breadcrumbText,
    breadcrumbLink: breadcrumbLink,
    unconstrained: unconstrained,
  };

  React.useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  return (
    <React.Fragment>
      {before}
      {navbar ? (
        <LayoutNavbar {...commonLayoutProps} navbar={navbar}>
          {children}
        </LayoutNavbar>
      ) : sidebar ? (
        <LayoutSidebar {...commonLayoutProps} sidebar={sidebar}>
          {children}
        </LayoutSidebar>
      ) : (
        <LayoutPlain {...commonLayoutProps}>{children}</LayoutPlain>
      )}
      {after}

      <ProcessingToast />
    </React.Fragment>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};

function LayoutPlain({ children, unconstrained = false, breadcrumbText, breadcrumbLink }) {
  return (
    <React.Fragment>
      <Container fluid={unconstrained}>
        <Breadcrumb label={breadcrumbText} to={breadcrumbLink} />
      </Container>

      <ContentLayoutWrapper>
        <Container fluid={unconstrained}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </ContentLayoutWrapper>
    </React.Fragment>
  );
}

function LayoutNavbar({ navbar, ...propsLayoutPlain }) {
  return (
    <React.Fragment>
      {navbar}
      <LayoutPlain {...propsLayoutPlain} />
    </React.Fragment>
  );
}

function LayoutSidebar({
  children,
  sidebar,
  unconstrained = false,
  breadcrumbText,
  breadcrumbLink,
}) {
  return (
    <LayoutSidebarWrapper>
      {sidebar}
      <div>
        <Container fluid={unconstrained}>
          <Breadcrumb label={breadcrumbText} to={breadcrumbLink} />
        </Container>

        <MainContentWrapper>
          <Container fluid={unconstrained}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Container>
        </MainContentWrapper>
      </div>
    </LayoutSidebarWrapper>
  );
}

/* =================================== */
// styles

const ContentLayoutWrapper = styled.div`
  font-family: "Inter", sans-serif;
  margin: 2.5rem auto 5rem auto;
`;

const LayoutSidebarWrapper = styled.div`
  font-family: "Inter", sans-serif;
  display: flex;
  height: 100%;

  > *:nth-child(1) {
    flex-shrink: 0;
  }

  > *:nth-child(2) {
    flex-grow: 1;
  }
`;

const MainContentWrapper = styled.div`
  ${LayoutSidebarWrapper} & {
    margin: 2.5rem auto 5rem auto;
  }
`;

export { PageWrapper };
