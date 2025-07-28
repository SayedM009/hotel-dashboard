/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import { getUmrahs } from "../services/apiUmrah";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import DashboardLayout from "../features/dashboard/DashboardLayout";

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
    background-color: var(--color-brand-700);
    color: white;
  }

  ${(props) =>
    props.variant === "active" &&
    css`
      background-color: var(--color-brand-700);
      color: white;
    `}

  ${(props) =>
    props.type === "search" &&
    "background-color: var(--color-brand-700); color: white; &:hover { background-color: var(--color-brand-800); }"}
`;

const operations = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
];

function Dashboard() {
  // Pre Fetch Bookings
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["bookings", "all", 1],
    queryFn: () => getBooking("all", 1),
    staleTime: 1000 * 60 * 1,
  });

  // Pre Fetch Umrahs
  queryClient.prefetchQuery({
    queryKey: ["umrah", "up coming"],
    queryFn: () => getUmrahs({}, "up coming"),
    staleTime: 1000 * 60 * 1,
  });

  return (
    <Row>
      <Row type="horizonal" style={{ justifyContent: "space-between" }}>
        <Heading as="h1">Dashbaord</Heading>
        <Operations operations={operations} filterField="last" />
      </Row>
      <DashboardLayout />
    </Row>
  );
}

function Operations({ filterField, operations, activeValue }) {
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
      </StyledTabsBox>
    </Row>
  );
}
export default Dashboard;
