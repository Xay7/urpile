import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import usePortal from '../../helpers/usePortal';

interface Props {
  position: { x: number; y: number };
}

const Popup: React.FC<Props> = ({ position }) => {
  const [popupXY, setPopupXY] = useState({ x: 0, y: 0 });
  const portal = usePortal();
  const ref = useRef(null);
  useEffect(() => {
    const bounding = ref.current.getBoundingClientRect();
    if (bounding.top >= 0 && bounding.left >= 0) {
      if (bounding.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        setPopupXY({ x: position.x, y: position.y });
      } else return setPopupXY({ x: position.x - 320, y: position.y });

      if (bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      } else console.log('bottom bad');
    }
  }, [position.x, position.y]);

  return portal(
    <Container x={popupXY.x} y={popupXY.y} ref={ref}>
      Hello
    </Container>
  );
};

const Container = styled('div')<any>`
  position: absolute;
  height: 300px;
  width: 300px;
  padding: 10px;
  background-color: red;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
`;

export default Popup;
