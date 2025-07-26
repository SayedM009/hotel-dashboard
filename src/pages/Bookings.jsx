/* eslint-disable react/prop-types */
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import SortBy from "../ui/SortBy";
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledTabsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
`;

const StyledTab = styled.button`
  padding: 0.5rem 1rem;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid var(--color-green-700);
  border-radius: 4px;
  text-transform: uppercase;
  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--color-green-700);
    color: white;
  }

  ${(props) =>
    props.variant === "active" &&
    css`
      background-color: var(--color-green-700);
      color: white;
    `}

  ${(props) =>
    props.type === "search" &&
    "background-color: var(--color-brand-700); color: white; &:hover { background-color: var(--color-brand-800); }"}
`;

// const StyledInputDate = styled.input`
//   padding: 0.5rem;
//   font-size: 1.2rem;
//   border: 1px solid var(--color-grey-300);
//   border-radius: 4px;
//   margin: 0 0.5rem;
//   width: 150px;
//   &:focus {
//     outline: none;
//     border-color: var(--color-green-700);
//   }
// `;

const options = [
  {
    value: "totalPrice-asc",
    label: "Sort by total price (low first)",
  },
  {
    value: "totalPrice-desc",
    label: "Sort by total price (high first)",
  },
];

const operations = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>

        <Operations
          filterField="status"
          options={options}
          operations={operations}
        />
      </Row>
      <BookingTable />
    </>
  );
}

function Operations({ filterField, options, operations, activeValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLTYPE =
    searchParams.get(filterField) || activeValue || operations[0].value;
  return (
    <Row type="horizontal">
      <StyledTabsBox>
        {operations.map(({ value, label }, index) => (
          <StyledTab
            variant={URLTYPE === value && "active"}
            onClick={() => {
              searchParams.set(filterField, value);
              setSearchParams(searchParams);
            }}
            key={index}
          >
            {label}
          </StyledTab>
        ))}
        <SortBy options={options} />
      </StyledTabsBox>
    </Row>
  );
}

export default Bookings;
