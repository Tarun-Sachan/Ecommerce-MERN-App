import React, { useState } from "react";
import styled from "styled-components";
const BigImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) => (props.active ? `border-color:#ccc;` : `border-color:transparent;
  opacity:.7;`)}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;
const BigImageWrapper = styled.div`
  text-align: center;
`;
const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            active={image === activeImage}
            onClick={() => {
              setActiveImage(image);
            }}
            key="image._id"
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
