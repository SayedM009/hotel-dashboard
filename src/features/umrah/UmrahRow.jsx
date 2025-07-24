import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/helpers";
import {
  PiExclamationMarkBold,
  PiListBold,
  PiXBold,
  PiPenBold,
  PiTrash,
} from "react-icons/pi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUmrahAPI } from "../../services/apiUmrah";
import { StyledButton, StyledList } from "../../ui/Menus";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import useHandleOutsideClick from "../../hooks/useHandleOutsideClick";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import toast from "react-hot-toast";
import CreateUmrahForm from "./CreateUmrahForm";
import Row from "../../ui/Row";
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
    minmax(130px, 2.5fr) /*  STATUSES */
    minmax(100px, 1fr); /* ACTIONS */
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
  width: 50%;
  text-align: center;
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
    font-size: 1.8rem;
    color: var(--color-grey-600);
    transition: 0.3s all ease-in-out;
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

export default function CabinRow({ umrah, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref: outRef } = useHandleOutsideClick(() => setIsOpen(false));
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

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteUmrahAPI,
    onSuccess: () => {
      toast.success(`Umrah ${clientName}'s order deleted sucessfully`);
      queryClient.invalidateQueries(["umarh"]);
    },
    onError: (error) => {
      toast.error(error || error.message);
    },
  });

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
          <strong>Travel</strong> : {formatDate(new Date(year, month - 1, day))}
        </p>
      </div>
      <p style={{ textAlign: "center" }}>{employeeName}</p>
      <Row>
        <Row type="horizontal">
          <p>Service status :</p>
          <Status type={status}>{status}</Status>
        </Row>
        <Row type="horizontal">
          <p>Payment status :</p>
          <Status type={servicePaymentStatus}>{servicePaymentStatus}</Status>
        </Row>
      </Row>
      <Actions>
        {!isOpen && <PiListBold onClick={() => setIsOpen(!isOpen)} />}
        {isOpen && <PiXBold onClick={() => setIsOpen(!isOpen)} />}
        {isOpen && (
          <StyledList ref={outRef} position={{ x: 85, y: 0 }}>
            <Modal>
              <Modal.Open opens="delete-umrah">
                <StyledButton>
                  <PiTrash /> Delete
                </StyledButton>
              </Modal.Open>
              <Modal.Window name="delete-umrah">
                <ConfirmDelete
                  resourceName={`${clientName} order`}
                  onConfirm={() => mutate(umrahId)}
                />
              </Modal.Window>
              <Modal.Open opens="edit-umrah">
                <StyledButton>
                  <PiPenBold />
                  Edit
                </StyledButton>
              </Modal.Open>
              <Modal.Window name="edit-umrah">
                <CreateUmrahForm
                  umrah={umrah}
                  onCloseModal={() => setIsOpen(false)}
                />
              </Modal.Window>
            </Modal>
          </StyledList>
        )}
      </Actions>
    </TableRow>
  );
}
