import * as React from "react";
import styled from "styled-components";
import { idCardFields } from "constants/index";

const { LABEL_PLAYER_NAME, LABEL_BIRTHDATE, LABEL_CATEGORY, LABEL_CLUB_MEMBER, LABEL_STATUS_EVENT } = idCardFields;

const previewTexts = {
  [LABEL_PLAYER_NAME]: "Morgan Lundin",
  [LABEL_BIRTHDATE]: "Jakarta, 17 Agustus 1945",
  [LABEL_CATEGORY]: "Individu - Umum - Barebow - 50m",
  [LABEL_CLUB_MEMBER]: "Robin Hood",
  [LABEL_STATUS_EVENT]: "Official",
  
};

export default function PreviewFieldText({ name, data = {} }) {
  const { y, fontFamily, fontSize, color, fontWeight } = data;
  const divRef = React.useRef(null);
  const [currentOffsetWidth, setCurrentOffsetWidth] = React.useState(0);
  const placeholderString = previewTexts[name];

  React.useEffect(() => {
    setCurrentOffsetWidth(divRef.current?.offsetWidth);
  }, []);

  return (
    <FieldTextContainer
      ref={divRef}
      left={1280 / 2 - currentOffsetWidth / 2 || 0}
      fontSize={fontSize}
      color={color}
      y={y}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
    >
      {placeholderString}
    </FieldTextContainer>
  );
}

const FieldTextContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${({ left }) => left}px;
  font-size: ${({ fontSize }) => fontSize || 60}px;
  ${({ color }) => (color ? `color: ${color};` : "")}
  transform: translate(0px, ${({ y }) => y}px);
  ${({ fontFamily }) => (fontFamily ? `font-family: ${fontFamily};` : "")}
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
`;
