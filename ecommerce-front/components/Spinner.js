import React from "react";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `display:flex;justify-content:center;margin-top:100px;`
      : `border: 0px solid blue`}
`;
const Spinner = ({ fullWidth }) => {
  return (
    <Wrapper fullWidth={fullWidth}>
      <MoonLoader speedMultiplier={1} color={"#555"} />
    </Wrapper>
  );
};

export default Spinner;
