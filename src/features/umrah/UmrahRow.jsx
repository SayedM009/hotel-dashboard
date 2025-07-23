import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import Tippy from "@tippyjs/react";
import { PiExclamationMarkBold, PiCirclesFour, PiXBold } from "react-icons/pi";

const TableRow = styled.div`
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
    minmax(100px, 1fr);
  gap: 1.2rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: ${(props) =>
    props.index % 2 === 0 ? "var(--color-grey-100)" : "var(--color-grey-200)"};
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const Status = styled.span`
  padding: 0.3rem 1.2rem;
  border-radius: 999px;
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: 700;
  width: fit-content;
  background-color: ${({ type }) =>
    type === "paid" || type === "finished"
      ? "#D1FADF"
      : type === "pending" || type === "processing" || type === "down payment"
      ? "#FEF3C7"
      : "#FECACA"};
  color: ${({ type }) =>
    type === "paid" || type === "finished"
      ? "#027A48"
      : type === "pending" || type === "processing"
      ? "#B54708"
      : "#B91C1C"};
`;
const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  position: relative;

  svg {
    cursor: pointer;
  }
`;

const CustomTippy = styled.span`
  background-color: red;
  background-color: var(--color-brand-500);
  color: white;
  font-size: 1.2rem;
  padding: 8px 12px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const MenuList = styled.ul`
  position: absolute;
  left: -170px;
  top: 0;
  background-color: var(--color-brand-200);
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    padding: 0.5rem 1.5rem;
    cursor: pointer;
  }

  li:hover {
    background-color: white;
  }
`;

export default function CabinRow({ umrah, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const {
    id: umrahId,
    clientName,
    serviceType,
    totalPrice,
    received,
    profit,
    createdAt,
    status,
    employeeName,
    servicePaymentStatus,
    year,
    day,
    month,
  } = umrah;

  const navigate = useNavigate();

  return (
    <TableRow index={index} type={status}>
      <p>{index + 1}</p>
      <p>{umrahId}</p>
      <Tippy
        content={<CustomTippy>{clientName}</CustomTippy>}
        theme="light"
        placement="top"
        animation="scale"
        arrow={true}
      >
        <Cabin>
          {clientName.slice(0, 12)} <PiExclamationMarkBold />
        </Cabin>
      </Tippy>
      <p>{serviceType}</p>
      <Price>{formatCurrency(totalPrice)}</Price>
      <Price>{formatCurrency(received)}</Price>
      <Discount>{formatCurrency(profit)}</Discount>
      <div>
        <p>
          <strong>Added</strong> : {formatDate(createdAt)}
        </p>
        <p>
          <strong>Travel</strong> : {formatDate(new Date(year, month, day))}
        </p>
      </div>
      <p>{employeeName}</p>
      <p>
        <Status type={status}>{status}</Status>
      </p>
      <Status type={servicePaymentStatus}>{servicePaymentStatus}</Status>
      <Actions>
        {!isOpen && <PiCirclesFour onClick={() => setIsOpen(!isOpen)} />}
        {isOpen && <PiXBold onClick={() => setIsOpen(!isOpen)} />}
        {isOpen && (
          <MenuList>
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </MenuList>
        )}
      </Actions>
    </TableRow>
  );
}
