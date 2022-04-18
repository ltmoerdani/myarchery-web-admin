import * as React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { EventsService } from "services";

import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";
import CardMenu from "../components/CardMenu";
import CardMenuWithButton from "../components/CardMenuWithButton";

import IconCopy from "components/ma/icons/mono/copy";
import IconInfo from "components/ma/icons/mono/info";
import IconCheck from "components/ma/icons/fill/check";

import { eventMenus } from "./utils/menus";

function PageEventDetailHome() {
  const { event_id } = useParams();
  const [eventDetail, setEventDetail] = React.useState(null);
  const [isQualificationSchedulesSet, setIsQualificationSchedulesSet] = React.useState(false);

  const isEventPublished = Boolean(eventDetail?.publicInformation.eventStatus);

  const renderManageEventMenuBadge = () => {
    if (!isEventPublished) {
      return (
        <InfoGrayBadge>
          <span className="icon-info">
            <IconInfo size="20" />
          </span>
          <span>Draft</span>
        </InfoGrayBadge>
      );
    }

    return (
      <PublishedBadge>
        <IconCheck size="20" />
        <span>Terpublikasi</span>
      </PublishedBadge>
    );
  };

  const computeHrefScheduleMenu = () => {
    if (!isQualificationSchedulesSet) {
      return `/dashboard/events/new/prepublish?eventId=${event_id}`;
    }
    return `/dashboard/event/${event_id}/scheduling-scoring`;
  };

  React.useEffect(() => {
    const getEventDetail = async () => {
      const result = await EventsService.getEventDetailById({ id: event_id });
      if (result.success) {
        setEventDetail(result.data);
      }
    };

    const getQualificationSchedules = async () => {
      const result = await EventsService.getEventQualificationSchedules({ event_id });
      if (result.success) {
        setIsQualificationSchedulesSet(Boolean(result.data?.length));
      }
    };

    getEventDetail();
    getQualificationSchedules();
  }, []);

  return (
    <StyledPageWrapper>
      <MetaTags>
        {eventDetail ? (
          <title>Dashboard | Event {eventDetail.publicInformation.eventName}</title>
        ) : (
          <title>Dashboard | Event</title>
        )}
      </MetaTags>

      <Container fluid className="mt-4 mb-5">
        {eventDetail ? (
          <React.Fragment>
            <DashboardHeading className="mb-5">
              <HeaderMain>
                <h1 className="mb-3">{eventDetail.publicInformation.eventName}</h1>
                <LandingPageLinkPlaceholder
                  url={eventDetail.publicInformation.eventUrl || "https://myarchery.id"}
                />
              </HeaderMain>

              <div>
                <LinkToDashboard to="/dashboard">
                  <i className="bx bx-left-arrow-alt fs-4" />
                  <span>Ke Beranda</span>
                </LinkToDashboard>
              </div>
            </DashboardHeading>

            <MenuGridWrapper>
              <CardMenu
                menu={eventMenus[1]}
                href={eventMenus[1].computeLink(event_id)}
                badge={renderManageEventMenuBadge()}
              />
              <CardMenu menu={eventMenus[8]} href={`/dashboard/event/${event_id}/budrests`} />
              <CardMenuWithButton
                eventDetail={eventDetail}
                spanLabel={"Peserta Individu : " + eventDetail?.totalParticipantIndividual}
                menu={eventMenus[2]}
                href={`/dashboard/member/${event_id}?type=individual`}
              />
              <CardMenuWithButton
                team={true}
                eventDetail={eventDetail}
                menu={eventMenus[3]}
                spanLabel={"Peserta Beregu : " + eventDetail?.totalParticipantTeam}
                href={`/dashboard/member/${event_id}?type=team`}
              />
              <CardMenu
                menu={eventMenus[4]}
                href={computeHrefScheduleMenu()}
                disabled={!isQualificationSchedulesSet}
                badge={
                  !isQualificationSchedulesSet && (
                    <InfoGrayBadge>
                      <span className="icon-info">&#8505;</span>
                      <span>Belum Diatur</span>
                    </InfoGrayBadge>
                  )
                }
              />
              <CardMenu menu={eventMenus[6]} href={eventMenus[6].computeLink(event_id)} />
            </MenuGridWrapper>
          </React.Fragment>
        ) : (
          <div>Sedang memuat data event...</div>
        )}
      </Container>
    </StyledPageWrapper>
  );
}

const StyledPageWrapper = styled.div`
  margin: 4rem 0;
`;

const DashboardHeading = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
`;

const HeaderMain = styled.div`
  flex: 1 1 0%;
`;

const LinkToDashboard = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 12px;
  border-radius: 2rem;
  background-color: var(--ma-gray-100);
  color: var(--ma-blue);

  &:hover {
    color: var(--ma-blue);
  }
`;

const MenuGridWrapper = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const InfoGrayBadge = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 2rem;
  background-color: var(--ma-gray-100);
  font-size: 12px;

  .icon-info {
    color: var(--ma-gray-400);
  }
`;

const PublishedBadge = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
`;

function LandingPageLinkPlaceholder({ url = "" }) {
  return (
    <StyledLandingPageLink onClick={() => navigator.clipboard.writeText(url)}>
      <StyledLinkInput value={url} placeholder="https://myarchery.id" disabled readOnly />
      <span className="icon-copy">
        <IconCopy size="20" />
      </span>
    </StyledLandingPageLink>
  );
}

const StyledLandingPageLink = styled.div`
  position: relative;
  max-width: 27.5rem;
  cursor: pointer;

  .icon-copy {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: calc(14px + 1.5rem);
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--ma-blue);
  }
`;

const StyledLinkInput = styled.input`
  display: block;
  padding: 0.5rem 0.75rem;
  padding-right: 2.5rem;
  width: 100%;
  border-radius: 0.25rem;
  border: solid 1px var(--ma-gray-400);
  background-color: transparent;
  color: var(--ma-gray-600);
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: #ffffff;
    border-color: var(--ma-gray-200);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
`;

export default PageEventDetailHome;
