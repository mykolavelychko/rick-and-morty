import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: #0abde3;
  border: 2px solid #1e272e;
  border-radius: 8px;
  color: #fff;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #ff9f43;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #576574;
    cursor: not-allowed;
  }
`;