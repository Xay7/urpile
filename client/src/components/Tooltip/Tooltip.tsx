import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import usePortal from '../../helpers/usePortal';

interface Props {}

const NoteForm: React.FC<Props> = props => {
  const ref = useRef(null);
  const portal = usePortal();
  const [test, setTest] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const childViewportPosition = ref.current.getBoundingClientRect();
    console.log(childViewportPosition);
    setTest({ x: childViewportPosition.x, y: childViewportPosition.y });
  }, []);

  const childElement = React.Children.only(props.children);

  return (
    <>
      {portal(<Container x={test.x} y={test.y}></Container>)}
      {React.Children.map(props.children, (element: any, idx) => {
        return React.cloneElement(element, { ref: ref });
      })}
    </>
  );
};

const Container = styled('div')<any>`
  height: 50px;
  width: 50px;
  background-color: red;
  position: absolute;
  top: ${props => props.y + 'px'};
  left: ${props => props.x + 'px'};
`;

export default NoteForm;
