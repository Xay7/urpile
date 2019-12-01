import React, { useRef, useState, useLayoutEffect, ReactNode } from 'react';
import styled from 'styled-components';
import usePortal from '../../helpers/usePortal';
import useWindowSize from '../../helpers/useWindowSize';

interface Props {
  position: 'top' | 'right' | 'bottom' | 'left';
  text?: string;
  component?: ReactNode;
}

// Tooltip need children to work
const Tooltip: React.FC<Props> = ({ position, children }) => {
  const [windowWidth] = useWindowSize();
  const ref = useRef(null);
  const tooltipRef = useRef(null);
  const portal = usePortal();
  const [toolTipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const childViewportPosition = ref.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const offset = 10;
    let x = null;
    let y = null;
    switch (position) {
      case 'top': {
        x = childViewportPosition.x + childViewportPosition.width / 2 - tooltipWidth / 2;
        y = childViewportPosition.y - tooltipHeight - offset;
        break;
      }
      case 'left': {
        x = childViewportPosition.x - tooltipWidth - offset;
        y = childViewportPosition.y + childViewportPosition.height / 2 - tooltipHeight / 2;
        break;
      }
      case 'bottom': {
        x = childViewportPosition.x + childViewportPosition.width / 2 - tooltipWidth / 2;
        y = childViewportPosition.y + childViewportPosition.height + offset;
        break;
      }
      case 'right': {
        x = childViewportPosition.x + childViewportPosition.width + offset;
        y = childViewportPosition.y + childViewportPosition.height / 2 - tooltipHeight / 2;
        break;
      }
      default:
        return null;
    }
    if (x + tooltipWidth + offset > (window.innerWidth || document.documentElement.clientWidth)) {
      x = childViewportPosition.x - tooltipWidth - offset;
    }

    if (y + tooltipHeight + offset > (window.innerHeight || document.documentElement.clientHeight)) {
      y = childViewportPosition.y - tooltipHeight - offset;
    }

    setTooltipPosition({ x: x, y: y });
  }, [windowWidth, position]);

  return (
    <>
      {portal(
        <Container x={toolTipPosition.x} y={toolTipPosition.y} ref={tooltipRef}>
          <p>a</p>
          <p>b</p>
          <p>c</p>
          <p>c</p>
          <p>c</p>
        </Container>
      )}
      {React.Children.map(children, (element: any) => {
        return React.cloneElement(element, { ref: ref });
      })}
    </>
  );
};

const Container = styled.div.attrs((props: { x: number; y: number }) => ({
  style: {
    top: props.y,
    left: props.x
  }
}))<any>`
  height: 50px;
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  background-color: red;
  position: absolute;
  z-index: 99;
`;

export default Tooltip;
