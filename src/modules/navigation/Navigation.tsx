import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  background-color: #1e272e;
  padding: 10px 5px;
  display: flex;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  font-size: 18px;
  padding: 5px;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;

  &.active {
    background-color: #ff9f43;
    color: #1e272e;
    font-weight: bold;
  }

  &:hover {
    background-color: #0abde3;
    color: #1e272e;
  }
`;

const Navigation = () => {
  return (
    <NavBar>
      <StyledNavLink
        to="/characters"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Characters
      </StyledNavLink>
      <StyledNavLink
        to="/locations"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Locations
      </StyledNavLink>
      <StyledNavLink
        to="/episodes"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Episodes
      </StyledNavLink>
    </NavBar>
  );
};

export default Navigation;
