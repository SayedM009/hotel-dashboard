import styled from "styled-components";
import Row from "./Row";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const StyledHeader = styled.div`
  background-color: var(--color-grey-0);
`;
export default function Header() {
  return (
    <StyledHeader>
      <Row type="horizontal">
        <h1>Header</h1>
        <LanguageSwitcher />
      </Row>
    </StyledHeader>
  );
}

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng");

  return (
    <div>
      {currentLanguage == "ar" && (
        <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
      )}
      {currentLanguage == "en" && (
        <Button onClick={() => i18n.changeLanguage("ar")}>العربية</Button>
      )}
    </div>
  );
}
