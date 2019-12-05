import React, { useRef, useState, useLayoutEffect, ReactNode } from 'react';
import styled from 'styled-components';
import usePortal from '../../helpers/usePortal';
import useWindowSize from '../../helpers/useWindowSize';
import useClickOutside from '../../helpers/useClickOutside';

interface Props {
  position: 'top' | 'right' | 'bottom' | 'left';
  text?: string;
  component?: ReactNode;
  on?: 'hover' | 'click';
}

// Tooltip need children to work
const Tooltip: React.FC<Props> = ({ position, children, component }) => {
  const [windowWidth] = useWindowSize();
  const ref = useRef(null);
  const tooltipRef = useRef(null);
  const portal = usePortal();
  const [toolTipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [display, setDisplay] = useState('flex');
  const [pos, setPos] = useState(position);
  useLayoutEffect(() => {
    const childViewportPosition = ref.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const offset = 10;
    let x = null;
    let y = null;
    switch (pos) {
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
      setPos('left');
      x = childViewportPosition.x - tooltipWidth - offset;
    }

    if (y + tooltipHeight + offset > (window.innerHeight || document.documentElement.clientHeight)) {
      setPos('top');
      y = childViewportPosition.y - tooltipHeight - offset;
    }

    setTooltipPosition({ x: x, y: y });
  }, [windowWidth]);

  useClickOutside(tooltipRef, () => {
    setDisplay('none');
  });

  return (
    <>
      {portal(
        <>
          <Container x={toolTipPosition.x} y={toolTipPosition.y} ref={tooltipRef} display={display} position={pos}>
            {component && component}
          </Container>
        </>
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
  height: max-content;
  width: max-content;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows['1dp']};
  position: absolute;
  z-index: 99;
  display: ${props => props.display};
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 1px 1px rgba(130, 130, 130, 1));
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right: ${props => (props.position === 'right' ? `12px solid ${props.theme.white}` : 'none')};
    border-left: ${props => (props.position === 'left' ? `12px solid ${props.theme.white}` : 'none')};
    left: ${props => (props.position === 'left' ? '100%' : props.position === 'right' ? '-12px' : '50%')};
  }
`;

export default Tooltip;
