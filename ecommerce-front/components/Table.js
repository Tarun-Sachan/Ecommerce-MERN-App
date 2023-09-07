import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-tranform: uppercase;
    color: #aaa;
    font-weight: normal;
    font-size: 0.8rem;
    font-weight: 600;
  }
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Table = (props) => {
  return <StyledTable {...props} />;
};

export default Table;
