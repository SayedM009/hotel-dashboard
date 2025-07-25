/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: auto;
  min-height: 400px;
  margin: 1rem 0;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  background-color: ${(props) => {
    if (props.index >= 0) {
      return props.index % 2 === 0
        ? "var(--color-grey-100)"
        : "var(--color-grey-200)";
    } else return "";
  }};
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  min-height: 450px;
  max-height: 450px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
    background-color: var(--color-grey-50);
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--color-brand-200);
    border: 2px solid transparent;
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.section`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children, index }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns} index={index}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render, noData }) {
  const { heading, text } = noData
    ? noData
    : {
        heading: "No Data found",
        text: "Something went wrong try again!",
      };
  if (!data.length)
    return (
      <Empty>
        <h2>{heading}</h2>
        <p>{text}</p>
      </Empty>
    );
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
