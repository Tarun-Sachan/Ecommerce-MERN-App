import Center from "@/components/Center";
import React, { useContext } from "react";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import WhiteBox from "@/components/WhiteBox";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>Rs. {product.price}</Price>
              </div>
              <div>
                <Button primary={1} onClick={() => addProduct(product._id)}>
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  await mongooseConnect();
  console.log(context.query);
  const product = await Product.findById({ _id: context.query.id });
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default ProductPage;
