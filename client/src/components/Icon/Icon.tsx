import React from "react";
import styled from "styled-components";
import { ReactComponent as Calendar } from "../../assets/svg/calendar.svg";
import { ReactComponent as Cog } from "../../assets/svg/cog.svg";
import { ReactComponent as Copy } from "../../assets/svg/copy.svg";
import { ReactComponent as Dashboard } from "../../assets/svg/dashboard.svg";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { ReactComponent as Key } from "../../assets/svg/key.svg";
import { ReactComponent as Logout } from "../../assets/svg/logout.svg";
import { ReactComponent as Notepad } from "../../assets/svg/notepad.svg";
import { ReactComponent as Check } from "../../assets/svg/check.svg";

const Icons = {
  calendar: Calendar,
  cog: Cog,
  copy: Copy,
  dashboard: Dashboard,
  delete: Delete,
  edit: Edit,
  key: Key,
  logout: Logout,
  notepad: Notepad,
  check: Check
};

interface Props {
  name: string;
  onClick?: Function;
  size?: string;
  style?: object;
}
export const Icon: React.FC<Props> = props => {
  const Icon = Icons[props.name];
  const StyledIcon = styled(Icon)`
    fill: ${props => props.theme.grey};
    border-radius: 50%;
    padding: 10px;
    width: ${props => (props.size ? props.size : "24px")};
    height: ${props => (props.size ? props.size : "24px")};
    transition: all 150ms;

    &:hover {
      cursor: pointer;
      background-color: #eee;
      fill: ${props => props.theme.primary};
    }
    &:active {
      background-color: #ddd;
    }
  `;
  return <StyledIcon onClick={props.onClick} size={props.size} style={props.style} />;
};

export default Icon;
