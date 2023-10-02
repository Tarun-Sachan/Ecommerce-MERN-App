<<<<<<< HEAD
import Center from "@/components/Center";
import Header from "@/components/Header";
import React from "react";
import styled from "styled-components";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import Link from "next/link";

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
  margin-top: 50px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2{
    margin-bottom:10px;
    margin-top:10px;
  }
  a {
    color: #555;
    text-decoration: none;
    display:inline-block;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
background-color:#ddd;
height:190px;
border-radius:15px;
display:flex;
align-items:center;
justify-content:center;
text-decoration: none;
color: #555;
`
const CategoriesPage = ({ mainCategories, categoriesProducts }) => {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((cat) => (
          <CategoryWrapper key={cat._id}>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={"/category/" + cat._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p) => (
                <ProductBox {...p} key={p} />
              ))}
              <ShowAllSquare href={"/category/" + cat._id}>
              Show All &rarr;
              </ShowAllSquare>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
};

export async function getServerSideProps() {
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const chaildCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id);
    const categoriesIds = [mainCatId, ...chaildCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}

export default CategoriesPage;
=======
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
>>>>>>> fbbebca23e5da367f7a6ef6d9ea7a74748482617
