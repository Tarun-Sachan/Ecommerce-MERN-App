import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import Link from "next/link";

const ProductWrapper = styled.div``;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  text-decoration:none;
  color:inherit;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product"+_id
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>Rs.{price}</Price>
          <Button onClick={() => addProduct(_id)} primary={1} outline={1}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
