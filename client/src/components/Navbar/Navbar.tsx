import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Calendar } from '../../assets/svg/calendar.svg';
import { ReactComponent as Key } from '../../assets/svg/key.svg';
import { ReactComponent as Notepad } from '../../assets/svg/notepad.svg';
import { ReactComponent as Dashboard } from '../../assets/svg/dashboard.svg';
import { ReactComponent as Logout } from '../../assets/svg/logout.svg';
import { ReactComponent as Cog } from '../../assets/svg/cog.svg';
import { useHistory } from 'react-router-dom';

const iconTypes = {
  calendar: Calendar,
  key: Key,
  notepad: Notepad,
  dashboard: Dashboard,
  logout: Logout,
  cog: Cog
};

const Navbar: React.FC = props => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await axios.post('/users/logout');
      history.push('/');
    } catch (error) {
      history.push('/');
      console.log('Error while logging out');
    }
  };
  return (
    <StyledNavbar>
      <SectionName>Dashboard</SectionName>
      <List>
        <Item icon="dashboard" to="/dashboard/main">
          Main
        </Item>
        <Item icon="notepad" to="/dashboard/notes">
          Notes
        </Item>
        <Item icon="calendar" to="/dashboard/calendar">
          Calendar
        </Item>
        <Item icon="key" to="/dashboard/passwords">
          Passwords
        </Item>
      </List>
      <SectionName>Account</SectionName>
      <List>
        <Item icon="cog" to="/dashboard/settings">
          Settings
        </Item>
        <Item icon="logout" to="/dashboard/logout" onClick={handleLogout}>
          Logout
        </Item>
      </List>
    </StyledNavbar>
  );
};

const Item: React.FC<any> = ({ children, icon, selected, ...rest }) => {
  const Icon = iconTypes[icon];

  return (
    <StyledItem>
      <StyledNavLink {...rest}>
        <Icon style={{ width: '24px', height: '24px' }} />
        <Text>{children}</Text>
      </StyledNavLink>
    </StyledItem>
  );
};

const StyledNavbar = styled.nav`
  position: fixed;
  height: 100vh;
  width: 240px;
  background-color: #fbfbfb;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows['1dp']};
  @media (max-width: 768px) {
    display: none;
  }
`;

const SectionName = styled.span`
  margin: 10px 0px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #484848;
  font-size: 1.3rem;
  text-transform: uppercase;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const StyledItem = styled.li`
  padding: 5px 0;
  width: 100%;
`;

const Text = styled.span`
  margin-left: 10px;
  font-size: 1.6rem;
  color: #333;

  &:hover {
    cursor: pointer;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 7px;
  background-color: #fbfbfb;
  border-radius: 3px;
  &.active {
    background-color: ${props => props.theme.primary};
    ${Text} {
      color: ${props => props.theme.white};
    }
    svg {
      fill: ${props => props.theme.white};
    }
  }
`;

export default Navbar;
