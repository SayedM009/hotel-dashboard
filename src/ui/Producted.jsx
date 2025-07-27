/* eslint-disable react/prop-types */
import styled from "styled-components";
import useGetUser from "../features/authentication/useGetUser";
import Sipnner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

function ProductedRoute({ children }) {
  // 1. Importing the useGetUser hook to get user data and authentication status
  const { user, isLoading, Authenticated } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !Authenticated) {
      navigate("/login");
    }
  }, [isLoading, Authenticated, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Sipnner />
      </FullPage>
    );

  // 2. If the user is not authenticated, redirect to the login page
  if (Authenticated) return children;
}

export default ProductedRoute;
