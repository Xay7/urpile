import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import moment, { Moment } from 'moment';
import axios from 'axios';
import { CalendarNotes } from './types';
import { TwitterPicker } from 'react-color';
import useClickOutside from '../../helpers/useClickOutside';

interface Props {
  hide: () => void;
  beginning: Moment;
  ending: Moment;
  success: (data) => void;
}

const NoteForm: React.FC<Props> = ({ hide, beginning, ending, success }) => {
  const focusRef = useRef(null);
  const colorPickerRef = useRef(null);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#0984e3');
  const [title, setTitle] = useState(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!beginning || !ending) {
      return;
    }

    if (!title) {
      setEmptyTitle(true);
      return;
    }

    const uuid = localStorage.getItem('uid');

    try {
      await axios.post(`/users/${uuid}/calendarnotes`, {
        title,
        beginning,
        ending,
        color
      });
      const res: any = await axios.get(`/users/${uuid}/calendarnotes`);
      res.data.forEach((el: CalendarNotes) => {
        el.beginning = moment(el.beginning);
        el.ending = moment(el.ending);
      });
      res.data.forEach((el: CalendarNotes) => {
        el.beginning = moment(el.beginning);
        el.ending = moment(el.ending);
      });
      hide();
      success(res.data);
    } catch (error) {}
  };

  const colorHandler = color => {
    setColor(color.hex);
  };

  useClickOutside(colorPickerRef, () => {
    if (showColorPicker) {
      setShowColorPicker(false);
    }
  });

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Container>
        <span>
          <Color onClick={() => setShowColorPicker(!showColorPicker)} color={color} />
        </span>
        {showColorPicker && (
          <ColorPicker ref={colorPickerRef}>
            <TwitterPicker onChange={color => colorHandler(color)} color={color} />
          </ColorPicker>
        )}
        <Input type="text" placeholder="Title" ref={focusRef} error={emptyTitle} onChange={e => setTitle(e.target.value)}></Input>
      </Container>
      <Container>
        <Button>Confirm</Button>
      </Container>
    </Form>
  );
};

const Form = styled.form`
  width: 260px;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

const Color = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${props => (props.color ? props.color : props.theme.primary)};
  border-radius: 4px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  box-sizing: border-box;
  margin-left: 10px;
  margin-right: 5px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const ColorPicker = styled.div`
  position: absolute;
  top: 86px;
  left: 14px;
`;

export default NoteForm;
