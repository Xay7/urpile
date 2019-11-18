import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Icon from "../../components/Icon/Icon";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import axios from "axios";

const Passwords: React.FC = () => {
  const [passwords, setPasswords] = useState<any[]>([
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
  ]);
  const [disable, setDisabled] = useState(false);

  const addPassword = () => {
    setPasswords([{ origin: "", user: "", password: "", newPassword: "true" }, ...passwords]);
    setDisabled(true);
  };

  return (
    <Container>
      <Settings>
        <Button style={{ width: "120px", margin: 0 }} onClick={addPassword} disabled={disable}>
          Add
        </Button>
      </Settings>
      {passwords.map(el => {
        return (
          <Password
            key={el.origin}
            origin={el.origin}
            user={el.user}
            password={el.password}
            newPassword={el.newPassword}
          />
        );
      })}
    </Container>
  );
};

const Password: React.FC<any> = ({ origin, username, password, newPassword }) => {
  const [showSettings, setshowSettings] = useState<boolean>(false);
  const [settingsPosition, setSettingsPositions] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [editing, setEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState({ origin: "", username: "", password: "" });
  const [editDataError, setEditDataError] = useState<{ password: boolean }>({
    password: false
  });

  React.useEffect(() => {
    setEditData({ origin: origin, username: username, password: password });
    if (newPassword) {
      setEditing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settingsHandler = (e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect() as DOMRect;
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    setshowSettings(!showSettings);
    setSettingsPositions({ x: x, y: y });
  };

  const validateData = () => {
    let password = false;
    console.log(editData);
    if (!editData.password) {
      password = true;
    }
    setEditDataError({ password: password });
    if (password) {
      return false;
    }
    return true;
  };

  const handleEdit = () => {
    setEditing(true);

    setshowSettings(false);
  };

  const handleDelete = () => {
    setshowSettings(false);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateData();
    if (!isValid) {
      return;
    }
    setEditing(false);
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateData();
    if (!isValid) {
      return;
    }
    await axios.post("/dashboard/password", editData);
    setEditing(false);
  };

  return (
    <StyledPassword>
      <img
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${origin ? origin : "default"}`}
        alt={origin}
        style={{ marginLeft: "20px" }}
      />
      <Form onSubmit={newPassword ? handleNewPasswordSubmit : handleEditSubmit}>
        <Input
          type="text"
          value={editData.origin ? editData.origin : origin}
          border={editing}
          disabled={!editing}
          copyValue={true}
          onChange={e => setEditData({ ...editData, origin: e.target.value })}
          autoComplete="disabled"
        />
        <Input
          type="text"
          value={editData.username ? editData.username : username}
          border={editing}
          disabled={!editing}
          copyValue={true}
          onChange={e => setEditData({ ...editData, username: e.target.value })}
          autoComplete="disabled"
        />
        <Input
          type="password"
          value={editData.password ? editData.password : password}
          border={editing}
          disabled={!editing}
          copyValue={true}
          onChange={e => setEditData({ ...editData, password: e.target.value })}
          autoComplete="new-password"
          error={editDataError.password}
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
  height: max-content;
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

const Settings = styled.div`
  height: 60px;
  width: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default Passwords;
