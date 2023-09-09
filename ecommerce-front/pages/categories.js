import Center from "@/components/Center";
import Header from "@/components/Header";
import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 1rem;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top:50px;
`;
const CategoriesPage = () => {
  return (
    <>
      <Header />
      <Center>
        <Box>
          <Heading>Categories Page Comming Soon...</Heading>
        </Box>
      </Center>
    </>
  );
};

export default CategoriesPage;
