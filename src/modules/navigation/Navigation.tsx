import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  background-color: #1e272e;
  padding: 10px;
  display: flex;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
`;

const NavLink = styled(Link)<{ active: boolean }>`
  color: ${(props) => (props.active ? "#ff9f43" : "white")};
  margin: 0 10px;
  text-decoration: none;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    text-decoration: underline;
  }
`;

const Navigation = () => {
  const location = useLocation();
  return (
    <NavBar>
      <NavLink to="/" active={location.pathname === "/"}>Characters</NavLink>
      <NavLink to="/locations" active={location.pathname === "/locations"}>Locations</NavLink>
      <NavLink to="/episodes" active={location.pathname === "/episodes"}>Episodes</NavLink>
    </NavBar>
  );
};

export default Navigation;