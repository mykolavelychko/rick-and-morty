import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 16px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background-color: #1e272e;
  border: 2px solid #0abde3;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  text-align: center;
  color: #fff;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  transition: transform 0.2s;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-color: #0abde3;
    color: #1e272e;
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: #ff9f43;
`;

export const CardText = styled.p`
  margin: 0;
  color: #c8d6e5;
`;

export const CardLink = styled(Link)`
  color: #ff9f43;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #ff6b6b;
  }
`;