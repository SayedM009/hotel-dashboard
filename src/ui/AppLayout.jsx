import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import Header from "./Header";
import SideBar from "./SideBar";
import ProductedRoute from "./Producted";
import DarkModeProvider from "../context/DarkModeContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
`;

function AppLayout() {
  return (
    <DarkModeProvider>
      <StyledAppLayout>
        <Suspense fallback={<Spinner />}>
          <ProductedRoute>
            <Header />
            <SideBar />
            <StyledMain>
              <Outlet />
            </StyledMain>
          </ProductedRoute>
        </Suspense>
      </StyledAppLayout>
    </DarkModeProvider>
  );
}

export default AppLayout;
