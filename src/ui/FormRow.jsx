import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function FormRow({ children, label = "", error }) {
  const { t } = useTranslation();
  return (
    <StyledFormRow>
      <Label
        htmlFor={children[0] ? children?.[0]?.props?.id : children.props.id}
      >
        {label && t(`${label}`)}
      </Label>
      {children}
      <Error>{error}</Error>
    </StyledFormRow>
  );
}
