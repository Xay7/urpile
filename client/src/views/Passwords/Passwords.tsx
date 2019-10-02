import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Icon from "../../components/Icon/Icon";
import Dropdown from "../../components/Dropdown/Dropdown";

const Passwords: React.FC = () => {
  const passwords = [
    {
      origin: "www.kongregate.com",
      user: "xayeso@gmail.com",
      password: "somedots"
    },
    {
      origin: "www.medium.com",
      user: "xayeso@gmail.com",
      password: "somedots"
    },
    {
      origin: "www.reddit.com",
      user: "xayeso@gmail.com",
      password: "somedots"
    }
  ];

  return (
    <Container>
      {passwords.map(el => {
        return <Password key={el.origin} origin={el.origin} user={el.user} password={el.password} />;
      })}
    </Container>
  );
};

const Password: React.FC<any> = ({ origin, user, password }) => {
  const [showSettings, setshowSettings] = useState<boolean>(false);
  const [settingsPosition, setSettingsPositions] = useState<any>({ x: 0, y: 0 });
  const [editing, setEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState({ origin: "", user: "", password: "" });

  const settingsHandler = (e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect() as DOMRect;
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    setshowSettings(!showSettings);
    setSettingsPositions({ x: x, y: y });
  };

  const handleEdit = () => {
    setEditing(true);
    setshowSettings(false);
  };

  const handleDelete = () => {
    setshowSettings(false);
  };

  const handleEditSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <StyledPassword>
      <img
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${origin}`}
        alt={origin}
        style={{ marginLeft: "20px" }}
      />
      <Form onSubmit={handleEditSave}>
        <Input
          type="text"
          value={editData.origin ? editData.origin : origin}
          border={editing}
          disabled={!editing}
          copyValue={true}
          onChange={e => setEditData({ ...editData, origin: e.target.value })}
        />
        <Input
          type="text"
          value={editData.user ? editData.user : user}
          border={editing}
          disabled={!editing}
          copyValue={true}
          onChange={e => setEditData({ ...editData, user: e.target.value })}
        />
        <Input
          type="password"
          value={editData.password ? editData.password : password}
          border={editing}
          disabled={!editing}
          copyValue={true}
          onChange={e => setEditData({ ...editData, password: e.target.value })}
        />
        <SettingsContainer>
          {!editing ? (
            <Icon name="cog" onClick={settingsHandler} />
          ) : (
            <button type="submit" style={{ border: "none", backgroundColor: "transparent", outline: "none" }}>
              <Icon name="check" style={{ fill: "green" }} />
            </button>
          )}
          {showSettings && (
            <Dropdown
              pos={{ x: settingsPosition.x, y: settingsPosition.y }}
              outsideClick={() => setshowSettings(false)}
              items={[{ name: "Edit", handler: handleEdit }, { name: "Delete", handler: handleDelete }]}
            />
          )}
        </SettingsContainer>
      </Form>
    </StyledPassword>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: ${props => props.theme.shadows["1dp"]};
  background-color: ${props => props.theme.white};
`;

const StyledPassword = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 200px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

export default Passwords;
