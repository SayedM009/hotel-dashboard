import { useState } from "react";
import { StyledButton, StyledList } from "../../ui/Menus";
import styled from "styled-components";
import useGetUser from "./useGetUser";
import Logout from "./Logout";
import useHandleOutsideClick from "../../hooks/useHandleOutsideClick";
import Account from "./Account";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  position: relative;
  justify-content: center;
  cursor: pointer;
  margin: 0 1rem;
`;

const StyledFullName = styled.span`
  font-weight: 600;
  color: var(--color-grey-800);
  user-select: none;
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useGetUser();
  const { avatar } = user.user_metadata;

  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen(!isOpen);
  }
  function closeMenu() {
    setIsOpen(false);
  }

  const { ref } = useHandleOutsideClick(closeMenu);
  return (
    <StyledUserAvatar ref={ref} onClick={handleToggle}>
      <Avatar src={avatar ? avatar : "/public/default-user.jpg"} />
      <StyledFullName>
        {user.user_metadata.fullName
          ? user.user_metadata.fullName
          : "No full name"}
      </StyledFullName>
      {isOpen && (
        <StyledList position={{ x: 10, y: 40 }}>
          <StyledButton>
            <Account />
          </StyledButton>
          <StyledButton>
            <Logout />
          </StyledButton>
        </StyledList>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
