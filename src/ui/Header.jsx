import styled from "styled-components";
import Row from "./Row";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { PiTranslate, PiUser } from "react-icons/pi";
import UserAvatar from "../features/authentication/UserAvatar";
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid var(--color-brand-100);
`;
export default function Header() {
  return (
    <StyledHeader>
      <Row type="horizontal">
        <h1>Header</h1>
        <Row type="horizontal">
          <UserAvatar />
          <LanguageSwitcher />
        </Row>
      </Row>
    </StyledHeader>
  );
}

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng");

  return (
    <Row>
      {currentLanguage == "ar" && (
        <Button onClick={() => i18n.changeLanguage("en")}>
          <PiTranslate />
          English
        </Button>
      )}
      {currentLanguage == "en" && (
        <Button onClick={() => i18n.changeLanguage("ar")}>
          {" "}
          <PiTranslate />
          العربية
        </Button>
      )}
    </Row>
  );
}
