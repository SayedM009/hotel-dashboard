import { PiSignOut } from "react-icons/pi";
import useLogout from "./useLogout";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const StyledLogout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & svg {
    color: var(--color-grey-900);
  }
`;

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <StyledLogout
          title="Logout"
          onClick={() => {
            console.log("logout");
            logout();
          }}
        >
          <PiSignOut /> <span>Logout</span>
        </StyledLogout>
      )}
    </>
  );
}

export default Logout;
