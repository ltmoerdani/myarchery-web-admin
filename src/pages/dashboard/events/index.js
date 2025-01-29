import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import {
  Col,
  Container,
  Row,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  Button
} from "reactstrap";
//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import CardEvent from "./components/CardEvent";
import { EventsService } from "../../../services"
import { PageWrapper } from "components/ma/page-wrapper"

const EventsPage = () => {
  // const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  const [listEvent, setListEvent] = useState([])

  const getEvent = async () => {
    const {message, errors, data } = await EventsService.get()
    if (data) {
      setListEvent(data)
      console.log(message)
    } else 
    console.log(message)
    console.log(errors)
  }

  useEffect(() => {
    getEvent()
  }, [])
  
  return (
    <PageWrapper title="Dashboard | List - Event">
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Dashboard" /> */}
          <div className="mb-3">
            <Row>
              <Col md={6}>
              {/* <Dropdown
                disabled
                isOpen={isOpenDropDown}
                toggle={() =>
                  setIsOpenDropDown(!isOpenDropDown)
                }
                >
                <DropdownToggle
                  tag="button"
                  className="btn btn-primary"
                  >
                  On Going Event <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>{" "} */}
              </Col>
              <Col md={6}>
                <div className="float-end">
                  <Button disabled color="outline-dark">List Event</Button>
                  <Button disabled className="mx-2" color="outline-dark">Kalender</Button>
                  {/* <Button color="primary">Tambah Event</Button> */}
                </div>
              </Col>
              </Row>
          </div>

          {/* / */}

          <Row>
            {listEvent.map((list) => {
              return (
                <>
                <Col key={list.event.id} md={6}>
                  <CardEvent detail={list} />
                </Col>
                </>
              )
            })}
            {/* <Col md={6}>
              <CardEvent detail={false} />
            </Col> */}
          </Row>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default EventsPage;
