import styled from "styled-components";
import {
  HiOutlineHome,
  HiCalendarDateRange,
  HiHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import getCabins from "../services/apiCabins";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    user-select: none;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  const { t } = useTranslation();
  const links = [
    { path: "/", name: t("NavLinks.home"), icon: <HiOutlineHome /> },
    {
      path: "bookings",
      name: t("NavLinks.bookings"),
      icon: <HiCalendarDateRange />,
    },
    { path: "cabins", name: t("NavLinks.cabins"), icon: <HiHomeModern /> },
    { path: "users", name: t("NavLinks.users"), icon: <HiOutlineUsers /> },
    {
      path: "settings",
      name: t("NavLinks.settings"),
      icon: <HiOutlineCog6Tooth />,
    },
  ];

  const queryClient = useQueryClient();

  async function handleOver() {
    await await queryClient.prefetchQuery({
      queryKey: ["cabins"],
      queryFn: getCabins,
    });
  }

  return (
    <NavList>
      {links.map(({ path, name, icon }, index) => {
        return path === "cabins" ? (
          <StyledNavLink key={index} to={path} onMouseOver={handleOver}>
            {icon}
            {name}
          </StyledNavLink>
        ) : (
          <StyledNavLink key={index} to={path}>
            {icon}
            {name}
          </StyledNavLink>
        );
      })}
    </NavList>
  );
}
