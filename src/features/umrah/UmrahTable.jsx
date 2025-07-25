/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import UmrahRow from "./UmrahRow";
import Row from "../../ui/Row";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUmrahForm from "./CreateUmrahForm";
import useGetUmrah from "./useGetUmarh";
import toast from "react-hot-toast";

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
`;

const SummaryTable = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-brand-100);
  padding: 1rem;
  min-height: 50px;
`;

const SummaryCell = styled.div`
  grid-column: span 1;
`;

const StyledTabsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  &:hover,
  &.active {
    background-color: var(--color-green-700);
    color: white;
  }

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

export default function CabinTable() {
  const [resultType, setResultsType] = useState({
    type: "up coming",
    from: "",
    to: "",
  });

  const { umrahs, isFetching, error, refetch } = useGetUmrah(resultType);

  if (error) return <div>Somthing went wrong!?</div>;
  return (
    <>
      {/* Filters */}
      <Filters
        umrahs={umrahs}
        resultType={resultType}
        setResultsType={setResultsType}
        refetch={refetch}
      />
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
            data={umrahs}
            render={(umrah, index) => (
              <UmrahRow umrah={umrah} key={umrah.id} index={index} />
            )}
          />
        )}
      </Table>

      {/* Add new umrah order */}
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>
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

function Filters({ umrahs, resultType, setResultsType, refetch }) {
  function getTotal(key) {
    if (key === "received")
      return formatCurrency(umrahs?.reduce((acc, cur) => acc + cur[key], 0));

    if (key === "refund")
      return formatCurrency(
        umrahs
          ?.filter((umrah) => umrah.servicePaymentStatus === "canceled")
          .reduce((acc, cur) => acc + cur.received, 0)
      );

    if (key)
      return formatCurrency(
        umrahs
          ?.filter((umrah) => umrah.servicePaymentStatus !== "canceled")
          .reduce((acc, cur) => acc + cur[key], 0)
      );
  }
  return (
    <Row>
      {/* <Heading as="h1">Umrah Sales</Heading> */}
      <div>
        {/* <Heading as="h2">Summary</Heading> */}
        <SummaryTable>
          <SummaryCell>
            <p>Umrah Order : {umrahs && umrahs.length}</p>
          </SummaryCell>
          <SummaryCell>
            <p>Total sales :{getTotal("totalPrice")}</p>{" "}
          </SummaryCell>
          <SummaryCell>
            <p>Total Profit : {getTotal("profit")}</p>
          </SummaryCell>
          <SummaryCell>
            <p>Total Received : {getTotal("received")}</p>
          </SummaryCell>
          <SummaryCell>
            <p>Total Refund : {getTotal("refund")}</p>
          </SummaryCell>
        </SummaryTable>
      </div>
      <StyledTabsBox>
        <StyledTab
          className={resultType.type == "all" && "active"}
          onClick={() => setResultsType({ ...resultType, type: "all" })}
        >
          All
        </StyledTab>
        <StyledTab
          className={resultType.type == "up coming" && "active"}
          onClick={() => setResultsType({ ...resultType, type: "up coming" })}
        >
          up coming
        </StyledTab>
        |<p>From : </p>
        <StyledInputDate
          type="date"
          value={resultType.from}
          onChange={(e) =>
            setResultsType({ ...resultType, from: e.target.value })
          }
        />
        <p>To : </p>
        <StyledInputDate
          type="date"
          value={resultType.to}
          onChange={(e) =>
            setResultsType({ ...resultType, to: e.target.value })
          }
        />
        <StyledTab
          type="search"
          onClick={() => {
            if (!resultType.from || !resultType.to) {
              return toast.error("Please select both dates");
            }
            setResultsType({ ...resultType, type: "spacific" });
            refetch();
            setTimeout(() => {
              setResultsType({
                ...resultType,
                type: "spacific",
                from: "",
                to: "",
              });
            }, 1000);
          }}
        >
          Search
        </StyledTab>
      </StyledTabsBox>
    </Row>
  );
}
