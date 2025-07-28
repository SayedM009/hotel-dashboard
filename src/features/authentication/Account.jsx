import { PiUser } from "react-icons/pi";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Account() {
  const StyledUserIcon = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    & svg {
      color: var(--color-grey-900);
    }
  `;

  return (
    <StyledUserIcon to="account">
      <PiUser /> Account
    </StyledUserIcon>
  );
}

export default Account;
