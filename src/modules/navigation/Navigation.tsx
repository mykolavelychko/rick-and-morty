import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  background-color: #333;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Navigation = () => {
  return (
    <NavBar>
      <NavLink to="/">Characters</NavLink>
      <NavLink to="/locations">Locations</NavLink>
      <NavLink to="/episodes">Episodes</NavLink>
    </NavBar>
  );
};

export default Navigation;