import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useWizardView } from "utils/hooks/wizard-view";
import { eventConfigs } from "constants/index";

import MetaTags from "react-meta-tags";
import { Container, Row, Col } from "reactstrap";
import { WizardView, WizardViewContent, ProgressBarLine } from "components/ma";
import Step1 from "../components/pre-wizard/Step1";
import Step2 from "../components/pre-wizard/Step2";

import typeIllustration from "assets/images/events/create-event-wizard-event-type.png";
import matchIllustration from "assets/images/events/create-event-wizard-event-competition.png";

const stepsList = [
  { step: 1, label: "Tentukan jenis waktu pelaksanaan" },
  { step: 2, label: "Tentukan jenis pertandingan" },
  { step: 3, label: "Daftar sebagai Event DKI Jakarta Series" },
];

const { EVENT_TYPES, MATCH_TYPES } = eventConfigs;

export default function PreWizard() {
  const { currentStep, stepsTotal, goToNextStep, goToPreviousStep } = useWizardView(stepsList);
  const computeProgressValue = () => currentStep / stepsTotal;

  const [eventType, setEventType] = React.useState(EVENT_TYPES.FULLDAY);
  const [matchType, setMatchType] = React.useState(MATCH_TYPES.TOURNAMENT);

  const handleEventTypeChange = (ev) => setEventType(ev.target.value);
  const handleMatchTypeChange = (ev) => setMatchType(ev.target.value);

  const shouldButtonNextDisabled = () => {
    if (currentStep === 1 && !eventType) {
      return true;
    }
    if (currentStep === 2 && !matchType) {
      return true;
    }
    return false;
  };

  return (
    <StyledPageWrapper>
      <MetaTags>
        <title>Persiapkan event baru yang dibuat | MyArchery.id</title>
      </MetaTags>

      <Container fluid className="mt-4 mb-5">
        <Row>
          <Col>
            {currentStep === 1 && <TypeIllustrationPanel />}
            {currentStep === 2 && <MatchIllustrationPanel />}
          </Col>

          <Col>
            <div className="px-5">
              <div className="mb-4">
                <ProgressBarLine value={computeProgressValue()} />
              </div>

              <WizardView currentStep={currentStep}>
                <WizardViewContent>
                  <Step1 eventType={eventType} onChange={handleEventTypeChange} />
                </WizardViewContent>

                <WizardViewContent>
                  <Step2 matchType={matchType} onChange={handleMatchTypeChange} />
                </WizardViewContent>
              </WizardView>

              <ActionButtonGroup className="mt-5">
                {currentStep === 2 ? (
                  <Link className="button-action next" to="/dashboard/events/new/fullday">
                    Buat Event
                  </Link>
                ) : (
                  <button
                    className="button-action next"
                    disabled={shouldButtonNextDisabled()}
                    onClick={() => goToNextStep()}
                  >
                    Lanjut
                  </button>
                )}

                {currentStep === 1 ? (
                  <Link className="button-action back" to="/dashboard">
                    Kembali
                  </Link>
                ) : (
                  <button className="button-action back" onClick={() => goToPreviousStep()}>
                    Kembali
                  </button>
                )}
              </ActionButtonGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledPageWrapper>
  );
}

const StyledPageWrapper = styled.div`
  margin: 5rem 0;
`;

const TypeIllustrationPanel = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  height: 100%;

  background-image: url(${typeIllustration});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const MatchIllustrationPanel = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  height: 100%;

  background-image: url(${matchIllustration});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const ActionButtonGroup = styled.div`
  .button-action {
    display: block;
    width: 100%;
    padding: 16px 20px;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    text-align: center;
    transition: background-color 0.2s;

    &.next {
      background-color: var(--ma-blue);
      color: #ffffff;
    }

    &:disabled {
      background-color: var(--ma-gray-400);
    }

    &.back {
      margin-top: 10px;
      background-color: unset;
      color: var(--ma-blue);
    }
  }
`;