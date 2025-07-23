import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import UmrahRow from "./UmrahRow";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import useGetCabins from "./useGetUmarh";
import CreateUmrahForm from "./CreateUmrahForm";
import { Link, useLocation } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;
  /* الحل الإضافي */
  min-width: 1800px; /* أو حسب عرض الأعمدة الفعلي */
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
    minmax(130px, 1fr) /* SERVICE STATUS */
    minmax(130px, 1fr) /* PAYMENT STATUS */
    minmax(100px, 1fr); /* PAYMENT STATUS */
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

export default function CabinTable() {
  const { t } = useTranslation();
  const [resultType, setResultsType] = useState({
    type: "all",
    month: null,
    year: null,
  });
  const { umrahs, isLoading, isFetching, error, refetch } = useGetCabins({
    ...resultType,
  });

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
  return (
    <>
      <Row>
        <Heading as="h1">Umrah Sales</Heading>
        <div>
          <Heading as="h2">Summary</Heading>
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
        <Row type="horizontail">
          <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
            <Button
              onClick={() => setResultsType({ ...resultType, type: "all" })}
            >
              All
            </Button>
            <Button
              onClick={() => {
                setResultsType({
                  type: "current",
                });
                refetch();
              }}
            >
              Coming this month
            </Button>
          </div>
          {/* <Button onClick={() => setResultsType({ type: "spacific" })}>
            Spacific
          </Button> */}
        </Row>
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
          <div>Status</div>
          <div>Payment Status</div>
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
