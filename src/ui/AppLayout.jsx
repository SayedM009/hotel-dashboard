import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";
import Input from "./Input";

const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;

function AppLayout() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Button>Click me</Button>
        <Input placeholder="Number of guests"></Input>
      </StyledApp>
    </>
  );
}

export default AppLayout;
