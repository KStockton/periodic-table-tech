/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import styled from "styled-components";

const backgroundColors = {
  "noble-gas": "rgb(234, 218, 36)",
  "diatomic-nonmetal": "rgb(57, 165, 118)",
  "alkali-metal": "hsl(326, 52%, 84%)",
  hydrogen: "rgb(163, 199, 210)",
  alkaline: "rgb(235, 93, 11)",
  lanthanide: "hsl(183, 54%, 84%)",
  actinide: "hsl(82, 60%, 56%)",
  metalloid: "hsl(142, 60%, 56%)",
  "polyatomic-non-metal": "rgb(20, 128, 136)",
  "transition-metal": "rgb(255, 227, 0)",
  "post-transition-metals": "rgb(91, 194, 234)",
  unknown: "rgb(13, 173, 173)",
};

const Card = styled.li`
  background-color: ${(props) => backgroundColors[props.classification]};
  width: 65px;
  height: 65px;
  border-radius: 0.4rem;
  grid-row: ${(props) => props.position.row};
  grid-column: ${(props) => props.position.column};
  display: ${(props) => (props.isGap ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Protest Riot, sans-serif;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
    opacity: 0.4;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: inherit;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.article`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: inherit;
  cursor: drag;

  & > h5 {
    font-family: var(--secondary-font);
    text-align: left;
    padding-left: 0.3rem;
  }

  &:hover {
    cursor: drag;
  }
`;

const CardFront = styled(CardFace)`
  color: black;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: inherit;
`;

const CardBack = styled(CardFace)`
  background-color: #404040;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: inherit;
`;

const Element = ({ element }) => {
  const cardRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/html", e.target.innerHTML);
    const techName = e.target.querySelectorAll("abbr")[1].getAttribute("title");
    e.dataTransfer.setData("text/plain", techName);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = 1;
  };

  const {
    atomicNumber,
    symbolFront,
    nameFront,
    nameBack,
    symbolBack,
    position,
    classification,
    isGap,
  } = element;

  if (element.isGap) {
    return;
  }

  return (
    <Card
      ref={cardRef}
      position={position}
      classification={classification}
      isGap={isGap}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-key={symbolFront}
    >
      <CardInner>
        <>
          <CardFront>
            <h5>{atomicNumber}</h5>
            <abbr title={nameFront}>{symbolFront}</abbr>
          </CardFront>
          <CardBack>
            <h5>{atomicNumber}</h5>
            <abbr title={nameBack}>{symbolBack}</abbr>
          </CardBack>
        </>
      </CardInner>
    </Card>
  );
};

export default Element;
