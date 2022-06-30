import * as React from "react";
import styled from "styled-components";
import { useDisplaySettings } from "../../contexts/display-settings";
import { useParticipantScorings } from "../../hooks/participant-scorings";

import { LoadingFullPage } from "../loading-fullpage";
import IconLoading from "../icon-loading";
import { SessionCellsDataHeading, SessionCellsData } from "./components/session-cells-data";
import { CountsBySession } from "./components/counts-by-session";

function ScoringTable() {
  const { activeCategoryDetail, sessionNumber, next } = useDisplaySettings();
  const teamType = activeCategoryDetail?.categoryTeam?.toLowerCase?.();
  const { data, isLoading, isFetching } = useParticipantScorings({
    categoryId: activeCategoryDetail.id,
    teamType,
    shouldPoll: true,
  });
  const [checkingSession, setCheckingSession] = React.useState(true);

  const hasData = Boolean(data);
  const isIndividual = teamType === "individual";
  const isTeam = teamType === "team";

  // Nge-skip yang gak ada datanya
  React.useEffect(() => {
    if (!data || data.length) {
      setCheckingSession(false);
      return;
    }
    next();
  }, [data]);

  // Nge-skip yang gak ada sesinya.
  // Misal gak punya sesi 3.
  React.useEffect(() => {
    if (isTeam || sessionNumber === 0) {
      setCheckingSession(false);
      return;
    }
    const sessionData = data?.[0]?.sessions[sessionNumber];
    if (sessionData) {
      setCheckingSession(false);
      return;
    }
    next();
  }, [data, isTeam, sessionNumber]);

  if (isLoading || checkingSession) {
    return (
      <SectionTableContainer>
        <ScoringEmptyBar>
          <SpinningLoader>
            <IconLoading />
          </SpinningLoader>
        </ScoringEmptyBar>
      </SectionTableContainer>
    );
  }

  if (isIndividual) {
    return (
      <AutoScrollingContainer shouldStart={hasData}>
        <SectionTableContainer>
          <LoadingFullPage isLoading={isFetching} />
          <TableScores>
            <thead>
              <tr>
                <th>Peringkat</th>
                <th className="text-uppercase">Nama</th>
                <th className="text-uppercase">Klub</th>
                <SessionCellsDataHeading sessions={data?.[0]?.sessions} />
                {sessionNumber === 0 && <th className="text-uppercase">Total</th>}
                <th className="text-uppercase">X</th>
                <th className="text-uppercase">X+10</th>
              </tr>
            </thead>

            <tbody>
              {!data?.length ? (
                <tr>
                  <td colSpan="6">
                    <ScoringEmptyRow>Belum ada data skor di kategori ini</ScoringEmptyRow>
                  </td>
                </tr>
              ) : (
                data.map((scoring, index) => (
                  <tr key={scoring.member.id}>
                    <td>
                      <DisplayRank>
                        <span>{index + 1}</span>
                      </DisplayRank>
                    </td>
                    <td>{scoring.member.name}</td>
                    <td>{scoring.member.clubName || <React.Fragment>&ndash;</React.Fragment>}</td>

                    <SessionCellsData sessions={scoring.sessions} />
                    <CountsBySession scoring={scoring} />
                  </tr>
                ))
              )}
            </tbody>
          </TableScores>
        </SectionTableContainer>
      </AutoScrollingContainer>
    );
  }

  if (isTeam) {
    return (
      <AutoScrollingContainer shouldStart={hasData}>
        <SectionTableContainer>
          <LoadingFullPage isLoading={isFetching} />

          <TableScores>
            <thead>
              <tr>
                <th>Peringkat</th>
                <th className="text-uppercase">Nama Tim</th>
                <th className="text-uppercase">Klub</th>
                <SessionCellsDataHeading sessions={data?.[0]?.sessions} />
                <th className="text-uppercase">Total</th>
                <th className="text-uppercase">X</th>
                <th className="text-uppercase">X+10</th>
              </tr>
            </thead>

            <tbody>
              {!data?.length ? (
                <tr>
                  <td colSpan="6">
                    <ScoringEmptyRow>Belum ada data skor di kategori ini</ScoringEmptyRow>
                  </td>
                </tr>
              ) : (
                data.map((scoring, index) => (
                  <tr key={scoring.participantId}>
                    <td>
                      <DisplayRank>
                        <span>{index + 1}</span>
                      </DisplayRank>
                    </td>

                    <td>
                      <TeamMembersBlock>
                        <h3>{scoring.team}</h3>
                        {scoring.teams?.length ? (
                          <ol>
                            {scoring.teams.map((member) => (
                              <li key={member.id}>{member.name}</li>
                            ))}
                          </ol>
                        ) : (
                          <EmptyMembers>Belum ada data peserta anggota</EmptyMembers>
                        )}
                      </TeamMembersBlock>
                    </td>

                    <td>{scoring.clubName || <React.Fragment>&ndash;</React.Fragment>}</td>
                    <td>{scoring.total}</td>
                    <td>{scoring.totalX}</td>
                    <td>{scoring.totalXPlusTen}</td>
                  </tr>
                ))
              )}
            </tbody>
          </TableScores>
        </SectionTableContainer>
      </AutoScrollingContainer>
    );
  }

  return (
    <SectionTableContainer>
      <ScoringEmptyBar>Error</ScoringEmptyBar>
    </SectionTableContainer>
  );
}

function AutoScrollingContainer({ children, shouldStart, deltaY = 2 }) {
  const scrollContainerRef = React.useRef(null);
  const direction = React.useRef(1);
  const [timerDone, setTimerDone] = React.useState(false);
  const [scrollDone, setScrollDone] = React.useState(false);
  const { next } = useDisplaySettings();

  // Timer untuk tabel yang isinya sedikit
  // set 5 detik
  React.useEffect(() => {
    if (!shouldStart) {
      return;
    }
    const timer = setTimeout(() => {
      setTimerDone(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [shouldStart]);

  // Eksekusi auto switch kategori
  React.useEffect(() => {
    if (!shouldStart || !timerDone || !scrollDone) {
      return;
    }
    next();
  }, [shouldStart, timerDone, scrollDone]);

  // Auto scrolling bolak-balik bawah-atas
  React.useEffect(() => {
    if (!shouldStart) {
      return;
    }

    const timer = setInterval(() => {
      if (!scrollContainerRef.current) {
        return;
      }

      const container = scrollContainerRef.current;
      direction.current *= _getDirection(container);
      container.scrollTop += direction.current * deltaY;

      if (!_checkIsFinish(container, direction.current)) {
        return;
      }
      setScrollDone(true);
    }, 50);

    return () => clearInterval(timer);
  }, [shouldStart]);

  return <div ref={scrollContainerRef}>{children}</div>;
}

function _getDirection(container) {
  let dir = 1;
  const lowestScrollPos = container.scrollTop + container.offsetHeight;
  if (lowestScrollPos >= container.scrollHeight) {
    dir = -1;
  }
  return dir;
}

function _checkIsFinish(container, direction) {
  return direction === -1 && container.scrollTop === 0;
}

const SectionTableContainer = styled.div`
  position: relative;
`;

const ScoringEmptyBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 30rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: #ffffff;
  color: var(--ma-blue);
`;

const SpinningLoader = styled.span`
  display: inline-block;
  animation: spin-loading 0.7s infinite linear;

  @keyframes spin-loading {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
`;

const TableScores = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.25rem;
  font-size: 1.75rem;

  thead {
    position: sticky;
    top: 0.25rem;
  }

  th,
  td {
    cursor: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  thead > tr > th {
    padding: 0.75rem;
    background-color: var(--ma-primary-blue-50);
  }

  tbody > tr > td {
    padding: 0.8125rem 0.625rem;
    background-color: #ffffff;
    font-size: 0.875em;
  }
`;

const DisplayRank = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4rem;
  padding-left: 2rem;
`;

const TeamMembersBlock = styled.div`
  min-height: 9.375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ol {
    margin: 0;
  }
`;

const EmptyMembers = styled.div`
  color: var(--ma-gray-200);
`;

const ScoringEmptyRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export { ScoringTable };
