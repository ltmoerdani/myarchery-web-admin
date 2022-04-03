import React, { useState, useEffect, useMemo } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Button, Col, Row, Input } from "reactstrap";
// import { SelectInput } from "components";
import TableMember from "./components/TableMember";
import { EventsService } from "services";
import { useParams, useLocation } from "react-router-dom";
import Download from "components/icons/Download";
import fileSaver from "file-saver";
import { errorsUtil } from "utils";
import { AlertSubmitError } from "components/ma";
import { BreadcrumbDashboard } from "../events/components/breadcrumb";
import { eventCategories } from "constants/index";

function ListMember() {
  const { event_id } = useParams();
  const [, setEventDetail] = useState({});
  const [members, setMembers] = useState([]);
  const [dataExcel, setDataExcel] = useState();
  const [errorsIdCard, setErrorsIdCard] = useState(null);
  const [waitIdCard, setWaitIdCard] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [eventCategoriesDetail, setEventCategoriesDetail] = useState({});
  const [indexCategory, setIndexCategory] = useState(-1);
  const [ageCategoryFilter, setAgeCategoryFilter] = useState("");
  const [teamCategoryFilter, setTeamCategoryFilter] = useState("");
  const [name, setName] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  const { TEAM_CATEGORIES } = eventCategories;

  useEffect(async () => {
    try {
      const { data, errors, success, message } = await EventsService.getEventById({ id: event_id });
      if (success) {
        if (data) {
          setEventDetail(data);
        }
      } else {
        console.log(message, errors);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();

  const getEventLaporan = async () => {
    try {
      const { data, message } = await EventsService.getEventLaporan({
        event_id: event_id,
        status_id: 1,
      });
      if (message === "Success") {
        setDataExcel(data);
      }
      console.error(message);
    } catch (error) {
      console.log(error);
    }
  };

  const getMember = async () => {
    try {
      const { message, errors, data } = await EventsService.getEventMemberNew({
        event_id: event_id,
        type: query.get("type"),
        competition_category_id: filterCategory,
        name: name,
        age_category_id: ageCategoryFilter,
        team_category_id: teamFilter,
      });
      if (message === "Success") {
        setMembers(data);
      }
      console.info(errors);
    } catch (errors) {
      console.log(errors);
    }
  };

  const getTeam = () => {
    if (teamCategoryFilter === "Individu Putra") {
      setTeamFilter(TEAM_CATEGORIES.TEAM_INDIVIDUAL_MALE);
    }
    if (teamCategoryFilter === "Individu Putri") {
      setTeamFilter(TEAM_CATEGORIES.TEAM_INDIVIDUAL_FEMALE);
    }
    if (teamCategoryFilter === "Beregu Putra") {
      setTeamFilter(TEAM_CATEGORIES.TEAM_MALE);
    }
    if (teamCategoryFilter === "Beregu Putri") {
      setTeamFilter(TEAM_CATEGORIES.TEAM_FEMALE);
    }
    if (teamCategoryFilter === "Mix Team") {
      setTeamFilter(TEAM_CATEGORIES.TEAM_MIXED);
    }
    if (teamCategoryFilter === "") {
      setTeamFilter("");
    }
  };

  const getEventCategoryDetails = async () => {
    const { message, errors, data } = await EventsService.getEventCategoryDetails({
      event_id: event_id,
    });
    if (message === "Success") {
      setEventCategoriesDetail(data);
    }
    console.info(errors);
  };

  useEffect(() => {
    getEventLaporan();
    getMember();
    getEventCategoryDetails();
    getTeam();
  }, [event_id, filterCategory, name, ageCategoryFilter, teamCategoryFilter, teamFilter]);

  const handleDownloadIdCard = async () => {
    setErrorsIdCard(null);
    setWaitIdCard(true);
    const queryString = { event_id: event_id };
    const result = await EventsService.getEventMemberIdCardByCategory(queryString);
    if (result.success) {
      const { fileName, fileBase64 } = result.data;
      fileSaver.saveAs(fileBase64, fileName || "id-cards-peserta.pdf");
    } else {
      setErrorsIdCard(errorsUtil.interpretServerErrors(result));
    }
    setWaitIdCard(false);
  };

  let dumpArray = [];
  let arrayAge = [];
  let arrayRegu = [];

  // console.log(indexCategory);
  // console.log(Object.values(eventCategoriesDetail)[indexCategory])
  dumpArray = Object.values(eventCategoriesDetail)[indexCategory];
  // console.log([...new Set(dumpArray?.map((d) => d.ageCategory))]);
  arrayAge = [...new Set(dumpArray?.map((d) => d.ageCategory))];
  arrayRegu = [...new Set(dumpArray?.map((d) => d.teamCategory))];

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Dashboard | List - Member</title>
        </MetaTags>
        <Container fluid>
          <BreadcrumbDashboard to={`/dashboard/event/${event_id}/home`}>
            Peserta Individu
          </BreadcrumbDashboard>

          <div>
            <div className="mb-4">
              <Row>
                <Col
                  className="py-2"
                  md={2}
                  sm={12}
                  style={{
                    textAlign: "center",
                    borderBottom: `${filterCategory === "" ? "2px solid #FFB420" : "none"}`,
                  }}
                >
                  <span
                    style={{ cursor: "pointer", color: "#0D47A1", fontWeight: "500" }}
                    onClick={() => {
                      setFilterCategory("");
                      setIndexCategory(-1);
                    }}
                  >
                    Semua
                  </span>
                </Col>
                {Object.keys(eventCategoriesDetail).map((category, index) => {
                  return (
                    <Col
                      key={index}
                      className="py-2"
                      md={2}
                      sm={12}
                      style={{
                        textAlign: "center",
                        borderBottom: `${
                          filterCategory === category ? "2px solid #FFB420" : "none"
                        }`,
                      }}
                    >
                      <span
                        style={{ cursor: "pointer", color: "#0D47A1", fontWeight: "500" }}
                        onClick={() => {
                          setFilterCategory(category);
                          setIndexCategory(index);
                        }}
                      >
                        {category}
                      </span>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div className="mb-4">
              <Row>
                <Col md={8} sm={12}>
                  <div style={{ width: "330px" }}>
                    <Input
                      placeholder="Cari archer"
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          setName(event.target.value);
                        }
                      }}
                    />
                  </div>
                </Col>
                <Col md={4} sm={12}>
                  <div className="d-block d-md-flex mt-md-0 mt-3 justify-content-end">
                    <a
                      href={dataExcel}
                      className="btn me-2"
                      style={{ backgroundColor: "#fff", border: "1px solid #0D47A1" }}
                    >
                      <Download /> <span style={{ color: "#0D47A1" }}>Unduh Laporan</span>
                    </a>

                    <Button
                      disabled={waitIdCard}
                      className="btn"
                      onClick={handleDownloadIdCard}
                      style={{ backgroundColor: "#fff", border: "1px solid #0D47A1" }}
                    >
                      <Download />{" "}
                      <span style={{ color: "#0D47A1" }}>
                        {waitIdCard ? "menyiapkan data..." : "Unduh ID Card"}
                      </span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="mb-4">
              <div
                className="d-flex align-items-center"
                style={{ flexWrap: "wrap", gap: "3.2rem" }}
              >
                <div>
                  <span>Kelas:</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ flexWrap: "wrap", gap: "0.5rem" }}
                >
                  <div>
                    <span
                      onClick={() => setAgeCategoryFilter("")}
                      style={{
                        border: "1px solid #0D47A1",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontWeight: "600",
                        color: "#0D47A1",
                        backgroundColor: `${ageCategoryFilter === "" ? "#E7EDF6" : "#FFF"}`,
                        cursor: "pointer",
                      }}
                    >
                      Semua
                    </span>
                  </div>
                  {arrayAge.map((age, index) => {
                    if (indexCategory > -1) {
                      return (
                        <div key={index}>
                          <span
                            onClick={() => setAgeCategoryFilter(age)}
                            style={{
                              border: "1px solid #0D47A1",
                              padding: "8px 12px",
                              borderRadius: "5px",
                              fontWeight: "600",
                              color: "#0D47A1",
                              cursor: "pointer",
                              backgroundColor: `${ageCategoryFilter === age ? "#E7EDF6" : "#FFF"}`,
                            }}
                          >
                            {age}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <div
                className="d-flex align-items-center mt-4"
                style={{ flexWrap: "wrap", gap: "1rem" }}
              >
                <div>
                  <span>Jenis Regu:</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ flexWrap: "wrap", gap: "0.5rem" }}
                >
                  <div>
                    <span
                      onClick={() => setTeamCategoryFilter("")}
                      style={{
                        border: "1px solid #0D47A1",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontWeight: "600",
                        color: "#0D47A1",
                        backgroundColor: `${teamCategoryFilter === "" ? "#E7EDF6" : "#FFF"}`,
                        cursor: "pointer",
                      }}
                    >
                      Semua
                    </span>
                  </div>
                  {arrayRegu.map((regu, index) => {
                    if (indexCategory > -1) {
                      return (
                        <div key={index}>
                          <span
                            onClick={() => setTeamCategoryFilter(regu)}
                            style={{
                              border: "1px solid #0D47A1",
                              padding: "8px 12px",
                              borderRadius: "5px",
                              fontWeight: "600",
                              color: "#0D47A1",
                              cursor: "pointer",
                              backgroundColor: `${
                                teamCategoryFilter === regu ? "#E7EDF6" : "#FFF"
                              }`,
                            }}
                          >
                            {regu}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>

          <TableMember members={members} />
        </Container>
        <AlertSubmitError isError={Boolean(errorsIdCard)} errors={errorsIdCard} />
      </div>
    </React.Fragment>
  );
}

export default ListMember;
