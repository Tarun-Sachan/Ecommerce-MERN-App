import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;
const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  margin-top:2px
`;

const Price = styled.div`
font-size:1.5rem;
font-weight:bold;
`

const ProductBox = ({ _id, title, description, price, images }) => {
  const {addProduct} = useContext(CartContext)
  return (
    <ProductWrapper>
      <WhiteBox>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>Rs.{price}</Price>
          <Button onClick={()=>addProduct(_id)} primary={1} outline={1}>
           Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
