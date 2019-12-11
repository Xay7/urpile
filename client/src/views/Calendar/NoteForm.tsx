import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import moment from 'moment';
import axios from 'axios';
import { CalendarNote } from './types';
import { TwitterPicker } from 'react-color';
import useClickOutside from '../../helpers/useClickOutside';

interface Props {
  hide: () => void;
  beginning: string;
  ending: string;
  success: (note: Array<CalendarNote>) => void;
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
      res.data.forEach((el: CalendarNote) => {
        el.beginning = moment(el.beginning);
        el.ending = moment(el.ending);
      });
      res.data.forEach((el: CalendarNote) => {
        el.beginning = moment(el.beginning);
        el.ending = moment(el.ending);
      });
      hide();
      success(res.data);
    } catch (error) {}
  };

  const colorHandler = (color: string) => {
    setColor(color);
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
            <TwitterPicker onChange={color => colorHandler(color.hex)} color={color} />
          </ColorPicker>
        )}
        <Input type="text" placeholder="Title" ref={focusRef} error={emptyTitle} onChange={e => setTitle(e.target.value)}></Input>
      </Container>
      <DateContainer>
        <Date>{moment(beginning).format('DD MMMM')}</Date>
        <span>&#8210;</span>
        <Date>{moment(ending).format('DD MMMM')}</Date>
      </DateContainer>
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
  margin-right: 20px;
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
  top: 76px;
  left: 24px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
  align-items: center;
  margin: 15px 0px;
`;

const Date = styled.span`
  font-size: 1.6rem;
  margin: 0 10px;
`;

export default NoteForm;
