/* eslint-disable react/prop-types */
import { PiPlus } from "react-icons/pi";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Spinner from "../../ui/Spinner";
import UmrahRow from "./UmrahRow";
import Row from "../../ui/Row";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUmrahForm from "./CreateUmrahForm";
import useGetUmrah from "./useGetUmarh";
import toast from "react-hot-toast";
import StyledSelect from "../../ui/Select";
import SortBy from "../../ui/SortBy";
import useSortBy from "../../hooks/useSortBy";
import useSlice from "../../hooks/useSlice";

const SummaryTable = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-200);
  padding: 1rem;
  min-height: 50px;
  border-radius: var(--border-radius-md);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
`;

const SummaryCell = styled.div`
  grid-column: span 1;
`;

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
    color: var(--color-grey-0);
  }

  ${(props) =>
    props.type === "active" &&
    css`
      background-color: var(--color-green-700);
      color: var(--color-grey-0);
    `}

  ${(props) =>
    props.type === "search" &&
    "background-color: var(--color-brand-700); color: white; &:hover { background-color: var(--color-brand-800); }"}
`;

const StyledInputDate = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  margin: 0 0.5rem;
  width: 150px;
  &:focus {
    outline: none;
    border-color: var(--color-green-700);
  }
  color: var(--color-grey-0);
`;

const columns = `minmax(50px, 0.3fr) /* NO. */
    minmax(60px, 0.4fr) /* ID */
    minmax(150px, 1.5fr) /* CLIENT NAME */
    minmax(100px, 0.7fr) /* SERVICE */
    minmax(120px, 1fr) /* TOTAL PRICE */
    minmax(120px, 1fr) /* RECEIVED */
    minmax(120px, 1fr) /* PROFIT */
    minmax(180px, 1fr) /* DATES */
    minmax(120px, 0.8fr) /* SALES NAME */
    minmax(170px, 2.5fr) /* SERVICE STATUS */
    minmax(50px, 1fr); /* ACTIONSs */`;
const options = [
  {
    value: "totalPrice-asc",
    label: "Sort by total price (low first)",
  },
  {
    value: "totalPrice-desc",
    label: "Sort by total price (high first)",
  },
  { value: "profit-asc", label: "Sort by profit (low first)" },
  { value: "profit-desc", label: "Sort by profit (high first)" },
  { value: "clientName-asc", label: "Sort by clientName (A-Z)" },
  {
    value: "clientName-desc",
    label: "Sort by clientName (Z-A)",
  },
];

const operations = [
  { name: "type", type: "all" },
  { name: "type", type: "up coming" },
];

export default function UmrahTable() {
  const { umrahs, isFetching, error } = useGetUmrah();
  const {
    slicedObj: slicedUmrahs,
    count,
    handleChangeCount,
  } = useSlice(umrahs);
  const { sortedObj: sortedUmrahs } = useSortBy(slicedUmrahs, "totalPrice-asc");

  return (
    <>
      {/* Filters */}
      <Row type="horizontal">
        <Operations
          operations={operations}
          options={options}
          activeValue={operations[1].type}
        />
        <CustomeSearch />
      </Row>
      {/* Table */}
      <Table columns={columns}>
        {/* Table header */}
        <Table.Header>
          <div>No.</div>
          <div>Id</div>
          <div>Client name</div>
          <div>Service</div>
          <div>Total price</div>
          <div>Received</div>
          <div>Profit</div>
          <div>Dates</div>
          <div>Sales Name</div>
          <div>Statuses</div>
          <div>Actions</div>
        </Table.Header>
        {/* Loading spinner */}
        {isFetching && <Spinner />}
        {/* Table Body */}
        {!isFetching && (
          <Table.Body
            data={sortedUmrahs}
            render={(umrah, index) => (
              <UmrahRow umrah={umrah} key={umrah.id} index={index} />
            )}
          />
        )}
      </Table>
      <StyledSelect value={count} onChange={handleChangeCount} type="white">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </StyledSelect>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button size="large">
            <PiPlus />
            Add Umrah Order
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateUmrahForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

function Operations({ options, operations, activeValue = operations[0].name }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLTYPE = searchParams.get(operations[0].name) || activeValue;

  return (
    <Row type="horizontal">
      <StyledTabsBox>
        {operations.map(({ name, type }, index) => (
          <StyledTab
            type={URLTYPE === type && "active"}
            onClick={() => {
              searchParams.set(name, type);
              setSearchParams(searchParams);
            }}
            key={index}
          >
            {type}
          </StyledTab>
        ))}
        <SortBy options={options} />
      </StyledTabsBox>
    </Row>
  );
}

function CustomeSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const FROM = searchParams.get("from") || "";
  const TO = searchParams.get("to") || "";
  return (
    <Row type="horizontal">
      <h5>From : </h5>
      <StyledInputDate
        type="date"
        value={FROM}
        onChange={(e) => {
          searchParams.set("from", e.target.value);
          setSearchParams(searchParams);
        }}
      />
      <h5>To : </h5>
      <StyledInputDate
        type="date"
        value={TO}
        onChange={(e) => {
          searchParams.set("to", e.target.value);
          setSearchParams(searchParams);
        }}
      />
      <StyledTab
        type="search"
        onClick={() => {
          if (!FROM || !TO) return toast.error("Please select both dates");

          searchParams.set("type", "range");
          setSearchParams(searchParams);
        }}
      >
        Search
      </StyledTab>
    </Row>
  );
}
