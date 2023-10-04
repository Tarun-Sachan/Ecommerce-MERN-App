import Center from "@/components/Center";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import { signIn, signOut } from "next-auth/react";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import axios from "axios";
import Spinner from "@/components/Spinner";
const Heading = styled.h1`
  font-size: 1rem;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;

  gap: 40px;
  margin: 40px 0;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const AccountPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);

  const { data: session } = useSession();
  console.log(session);
  async function signOutHandler() {
    await signOut();
    console.log("sign out");
  }
  async function signInHandler() {
    await signIn("google");
    setLoaded(false);
  }
  const saveAddress = () => {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  };
  useEffect(() => {
    if (!session) {
      return;
    }
    setLoaded(false);
    axios.get("/api/address").then((response) => {
      setName(response.data?.name);
      setEmail(response.data?.email);
      setCity(response.data?.city);
      setPostalCode(response.data?.postalCode);
      setStreetAddress(response.data?.streetAddress);
      setCountry(response.data?.country);
      setLoaded(true);
    });
  }, [session]);
  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Heading>Wishlist</Heading>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={300}>
              <WhiteBox>
                <Heading>Account Details</Heading>
                {!loaded && session && <Spinner fullWidth={1} />}
                {loaded && (
                  <>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />

                    <Button block={1} black={1} onClick={saveAddress}>
                      Save
                    </Button>
                    <hr />
                  </>
                )}

                {session && (
                  <Button primary onClick={signOutHandler}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary onClick={signInHandler}>
                    SignIn
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
};

export default AccountPage;
