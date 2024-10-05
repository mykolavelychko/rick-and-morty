import styled from "styled-components";

export const Container = styled.div`
  padding: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f0f0f0;
  }
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  cursor: pointer;
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const TableHeaderCell = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
`;