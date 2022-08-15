import * as React from "react";
import styled from "styled-components";
import { useEliminationMatches } from "../hooks/elimination-matches";

import { SpinnerDotBlock } from "components/ma";

import classnames from "classnames";

import imgEmptyBracket from "assets/images/elimination/illustration-empty-bracket.png";

function ScoringTableTeam({ categoryDetailId, categoryDetails, eliminationMemberCounts }) {
  const { isError, data } = useEliminationMatches(categoryDetailId, eliminationMemberCounts);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const isSettled = Boolean(data) || (!data && isError);

  if (!isSettled) {
    return (
      <SectionTableContainer>
        <SpinnerDotBlock />
      </SectionTableContainer>
    );
  }

  // Tabel dirender sebagai "state kosong" ketika:
  // 1. belum menentukan jumlah peserta eliminasi di page skoring kualifikasi (belum ada ID eliminasi/`eliminationId`)
  // 2. belum menentukan bagan eliminasi (terlempar error)
  if (!data?.eliminationGroupId) {
    return (
      <SectionTableContainer>
        <EmptyBracketContainer>
          <FloatingEmptyBracketContent>
            <div>
              <EmptyStateHeading>Data tidak tersedia</EmptyStateHeading>
              <EmptyStateDescription>
                Maaf tidak ada klasemen dengan kategori yang Anda cari. Silakan cari dengan kategori
                lain.
              </EmptyStateDescription>
            </div>
          </FloatingEmptyBracketContent>
        </EmptyBracketContainer>
      </SectionTableContainer>
    );
  }

  // Happy path
  const tabLabels = _getTabLabels(data.rounds);
  const currentRows = data.rounds[selectedTab]?.seeds || [];
  const thTotalLabel = _getTotalLabel(categoryDetails);

  return (
    <SectionTableContainer>
      <StagesTabs
        labels={tabLabels}
        currentTab={selectedTab}
        onChange={(index) => setSelectedTab(index)}
      />

      <MembersTable className="table table-responsive">
        <thead>
          <tr>
            <th className="text-center">Bantalan</th>
            <th>Tim</th>
            <ThTotal>{thTotalLabel}</ThTotal>
            <th></th>
            <ThTotal>{thTotalLabel}</ThTotal>
            <th>Tim</th>
          </tr>
        </thead>

        <tbody key={selectedTab}>
          {currentRows.map((row, index) => {
            const team1 = row.teams[0];
            const team2 = row.teams[1];

            const roundNumber = selectedTab + 1;

            const isBye =
              row.teams.some((team) => team.status === "bye") ||
              (roundNumber === 1 && row.teams.every((team) => !team.teamName));
            const noData =
              !team1?.teamName ||
              !team2?.teamName ||
              !team1?.memberTeam?.length ||
              !team2?.memberTeam?.length;
            const bothAreBye = row.teams.every((team) => team.status === "wait");
            const budrestNumber = _getBudrestNumber(row);

            return (
              <tr key={index}>
                <td className="text-center">
                  <BudrestNumberLabel>{budrestNumber}</BudrestNumberLabel>
                </td>

                <td>
                  <PlayerLabelContainerLeft>
                    <PlayerNameData>
                      {team1?.potition && <RankLabel>#{team1?.potition || "-"}</RankLabel>}
                      <div>
                        <TeamNameLabel>
                          {team1?.teamName || <NoArcherTeamLabel isBye={isBye} />}
                        </TeamNameLabel>
                        {Boolean(team1?.memberTeam?.length) && (
                          <MembersList>
                            {team1.memberTeam.map((member) => (
                              <li key={member.memberId}>{member.name}</li>
                            ))}
                          </MembersList>
                        )}
                      </div>
                    </PlayerNameData>
                  </PlayerLabelContainerLeft>
                </td>

                <td>
                  {!noData || (!bothAreBye && isBye) ? (
                    <HeadToHeadScoreLabels>
                      <ScoreTotalLabel
                        className={classnames({
                          "score-label-higher":
                            team1?.status === "win" || team1?.adminTotal > team2?.adminTotal,
                        })}
                      >
                        {team1?.adminTotal || 0}
                      </ScoreTotalLabel>
                    </HeadToHeadScoreLabels>
                  ) : (
                    <HeadToHeadScoreLabels>
                      <ScoreTotalLabel className="score-empty">&ndash;</ScoreTotalLabel>
                    </HeadToHeadScoreLabels>
                  )}
                </td>

                <td>
                  <InlineScoreInput>
                    <NoArcherWrapper>-</NoArcherWrapper>
                  </InlineScoreInput>
                </td>

                <td>
                  {!noData || (!bothAreBye && isBye) ? (
                    <HeadToHeadScoreLabels>
                      <ScoreTotalLabel
                        className={classnames({
                          "score-label-higher":
                            team2?.status === "win" || team2?.adminTotal > team1?.adminTotal,
                        })}
                      >
                        {team2?.adminTotal || 0}
                      </ScoreTotalLabel>
                    </HeadToHeadScoreLabels>
                  ) : (
                    <HeadToHeadScoreLabels>
                      <ScoreTotalLabel className="score-empty">&ndash;</ScoreTotalLabel>
                    </HeadToHeadScoreLabels>
                  )}
                </td>

                <td>
                  <PlayerLabelContainerRight>
                    <PlayerNameData>
                      {team2?.potition && <RankLabel>#{team2?.potition || "-"}</RankLabel>}
                      <div>
                        <TeamNameLabel>
                          {team2?.teamName || <NoArcherTeamLabel isBye={isBye} />}
                        </TeamNameLabel>
                        {Boolean(team2?.memberTeam?.length) && (
                          <MembersList>
                            {team2.memberTeam.map((member) => (
                              <li key={member.memberId}>{member.name}</li>
                            ))}
                          </MembersList>
                        )}
                      </div>
                    </PlayerNameData>
                  </PlayerLabelContainerRight>
                </td>
              </tr>
            );
          })}
        </tbody>
      </MembersTable>
    </SectionTableContainer>
  );
}

function StagesTabs({ labels, currentTab, onChange }) {
  return (
    <StagesBarContainer>
      <StageTabsList>
        {labels.map((label, index) => (
          <li key={label}>
            <StageTabButton
              className={classnames({ "session-tab-active": index === currentTab })}
              onClick={() => onChange(index)}
            >
              <span>{label}</span>
            </StageTabButton>
          </li>
        ))}
      </StageTabsList>
    </StagesBarContainer>
  );
}

function NoArcherTeamLabel({ isBye }) {
  if (isBye) {
    return <NoArcherWrapper>&#171; bye &#187;</NoArcherWrapper>;
  }
  return <NoArcherWrapper>&#171; Belum ada tim &#187;</NoArcherWrapper>;
}

/* ============================ */
// styles

const SectionTableContainer = styled.section`
  background-color: #ffffff;
`;

const ThTotal = styled.th`
  white-space: nowrap;
`;

const BudrestNumberLabel = styled.div`
  display: inline-block;
  width: 3rem;
  border-radius: 0.25rem;
  font-weight: 600;
  text-align: center;
`;

const InlineScoreInput = styled.div`
  position: relative;
`;

const EmptyBracketContainer = styled.div`
  min-height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingEmptyBracketContent = styled.div`
  max-width: 19.25rem;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background-image: url("${imgEmptyBracket}");
  background-repeat: no-repeat;
  background-position: top center;

  text-align: center;
`;

const EmptyStateHeading = styled.h4`
  color: var(--ma-blue);
  font-weight: 600;
`;

const EmptyStateDescription = styled.p`
  color: var(--ma-gray-600);
`;

const StagesBarContainer = styled.div`
  padding: 1rem;
`;

const StageTabsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  gap: 0.5rem;
`;

const StageTabButton = styled.button`
  display: block;
  border: none;
  padding: 0 0.5rem;
  background-color: transparent;

  min-width: 6rem;
  color: var(--ma-gray-400);
  font-size: 0.875rem;
  font-weight: 600;

  transition: all 0.15s;

  > span {
    display: block;
    position: relative;
    width: fit-content;
    margin: 0 auto;
    padding: 0.25rem 0;

    &::before {
      content: " ";
      position: absolute;
      height: 2px;
      top: 0;
      left: 0;
      width: 1.5rem;
      background-color: transparent;
      transition: all 0.3s;
      transform: scaleX(0);
      transform-origin: left;
    }
  }

  &:hover {
    color: var(--ma-blue);
  }

  &.session-tab-active {
    color: var(--ma-blue);

    > span {
      &::before {
        background-color: #90aad4;
        transform: scaleX(1);
      }
    }
  }
`;

const MembersTable = styled.table`
  --indicator-space-margin: 3rem;
  text-align: center;

  thead {
    background-color: var(--ma-primary-blue-50);

    th {
      color: var(--ma-txt-black);
      font-weight: 600;
    }
  }

  tbody td {
    padding: 0.25rem 0.25rem;
    vertical-align: middle;
  }

  th,
  td {
    cursor: auto;
  }
`;

const PlayerLabelContainerLeft = styled.div`
  margin-right: var(--indicator-space-margin);
`;

const PlayerLabelContainerRight = styled.div`
  margin-left: var(--indicator-space-margin);
`;

const PlayerNameData = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const RankLabel = styled.div`
  padding: 0.625rem 0.5rem;
  min-width: 3rem;
  background-color: var(--ma-primary-blue-50);
  white-space: nowrap;
  font-weight: 600;
`;

const TeamNameLabel = styled.div`
  font-weight: 600;
  text-align: left;
`;

const MembersList = styled.ol`
  margin: 0;
  margin-top: 0.5rem;
  padding-left: 1rem;
  text-align: left;
  font-size: 0.625rem;
`;

const NoArcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  width: 100%;
  min-height: 4.625rem;
  color: var(--ma-gray-400);
`;

const HeadToHeadScoreLabels = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ScoreTotalLabel = styled.span`
  display: block;
  padding: 0.625rem 0.5rem;
  min-width: 3rem;
  background-color: var(--ma-gray-200);
  white-space: nowrap;

  &.score-label-higher {
    background-color: var(--ma-secondary);
  }

  &.score-empty {
    background-color: var(--ma-gray-50);
    color: var(--ma-gray-200);
  }
`;

/* =========================== */
// utils

const tabLabels = {
  16: "32 Besar",
  8: "16 Besar",
  4: "8 Besar",
  2: "Semi-Final",
};

function _getTabLabels(bracketTemplate) {
  if (!bracketTemplate) {
    return [];
  }

  let finalHasTaken = false;
  const labels = bracketTemplate.map((round) => {
    const matchCount = round.seeds.length;
    if (matchCount > 1) {
      return tabLabels[matchCount];
    }
    if (!finalHasTaken) {
      finalHasTaken = true;
      return "Final";
    }
    return "3rd Place";
  });

  return labels;
}

function _getBudrestNumber(row) {
  if (!row?.teams?.length) {
    return "-";
  }

  const player1 = row.teams[0];
  const player2 = row.teams[1];

  if (player1?.budrestNumber) {
    return player1.budrestNumber;
  }

  if (player2?.budrestNumber) {
    return player2.budrestNumber;
  }

  return "-";
}

function _getTotalLabel(categoryDetails) {
  if (!categoryDetails?.id) {
    return "Total";
  }
  const TYPE_POINT = "Total Set Poin";
  const TYPE_ACCUMULATION = "Total Skor";
  return categoryDetails.competitionCategoryId.toLowerCase() === "compound"
    ? TYPE_ACCUMULATION
    : TYPE_POINT;
}

export { ScoringTableTeam };
