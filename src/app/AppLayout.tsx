import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../modules/navigation/Navigation";


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const AppLayout = () => {
  return (
    <LayoutContainer>
      <Navigation />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default AppLayout;