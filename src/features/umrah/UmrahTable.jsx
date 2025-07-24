import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import UmrahRow from "./UmrahRow";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUmrahForm from "./CreateUmrahForm";
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import useGetUmrah from "./useGetUmarh";
import toast from "react-hot-toast";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;
  min-width: 1400px;
  min-height: 400px;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns:
    minmax(50px, 0.3fr) /* NO. */
    minmax(60px, 0.4fr) /* ID */
    minmax(150px, 1.5fr) /* CLIENT NAME */
    minmax(100px, 0.7fr) /* SERVICE */
    minmax(120px, 1fr) /* TOTAL PRICE */
    minmax(120px, 1fr) /* RECEIVED */
    minmax(120px, 1fr) /* PROFIT */
    minmax(180px, 1fr) /* DATES */
    minmax(120px, 0.8fr) /* SALES NAME */
    minmax(130px, 2.5fr) /* SERVICE STATUS */
    minmax(50px, 1fr); /* ACTIONSs */
  gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

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

export default function CabinTable() {
  const { t } = useTranslation();
  const [resultType, setResultsType] = useState({
    type: "up coming",
    from: "",
    to: "",
  });
  const { umrahs, isFetching, error, refetch } = useGetUmrah(resultType);

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

  if (error) return <div>Somthing went wrong!?</div>;
  if (umrahs?.length <= 0) return <NoUmrahs />;
  return (
    <>
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
              setResultsType({
                ...resultType,
                type: "spacific",
                from: "",
                to: "",
              });
            }}
          >
            Search
          </StyledTab>
        </StyledTabsBox>
      </Row>
      <Table role="table">
        <TableHeader role="row">
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
        </TableHeader>
        {isFetching && <Spinner />}
        {!isFetching &&
          umrahs?.map((umrah, index) => (
            <UmrahRow umrah={umrah} key={umrah.id} index={index} />
          ))}
      </Table>

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

function NoUmrahs() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
        height: "100%",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <h2>No Umrah Orders Found</h2>
      <p>Please add a new Umrah order to get started.</p>
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
    </div>
  );
}
