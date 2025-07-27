/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { formatDate } from "../../utils/helpers";
import {
  PiListBold,
  PiXBold,
  PiPenBold,
  PiTrash,
  PiDownload,
} from "react-icons/pi";
import { StyledButton, StyledList, StyledToggle } from "../../ui/Menus";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import useHandleOutsideClick from "../../hooks/useHandleOutsideClick";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateUmrahForm from "./CreateUmrahForm";
import Row from "../../ui/Row";
import Table from "../../ui/Table";
import useDeleteUmrah from "./useDeleteCabin";
import { useMutation } from "@tanstack/react-query";
import { downLoadUmrahImgs } from "../../services/apiUmrah";
import toast from "react-hot-toast";
import { IoMdAlert } from "react-icons/io";
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
const StyledActions = styled.div`
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

const StyledIndex = styled.h6`
  font-size: 1.5rem;
`;

export default function CabinRow({ umrah, index }) {
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
    travelDate,
    files,
  } = umrah;

  return (
    <Table.Row index={index} type={status}>
      <StyledIndex>{String(index + 1).padStart(2, 0)}</StyledIndex>
      <p>{umrahId}</p>
      <Tippy
        content={<CustomTippy>{clientName}</CustomTippy>}
        theme="light"
        placement="top"
        animation="scale"
        arrow={true}
      >
        <Cabin>
          {clientName.slice(0, 12)}{" "}
          <sup>
            <IoMdAlert />
          </sup>
        </Cabin>
      </Tippy>
      <p>{serviceType}</p>
      <Price>{formatCurrency(totalPrice)}</Price>
      <Price>{formatCurrency(received)}</Price>
      <Discount>{formatCurrency(profit)}</Discount>
      <Row>
        <p>
          <strong>Added</strong> : {formatDate(createdAt)}
        </p>
        <p>
          <strong>Travel</strong> : {formatDate(travelDate)}
        </p>
      </Row>
      <p style={{ textAlign: "center" }}>{employeeName}</p>
      <Row>
        <Row>
          <Status type={status}>{status}</Status>
        </Row>
        <Row>
          <Status type={servicePaymentStatus}>{servicePaymentStatus}</Status>
        </Row>
      </Row>
      <Actions umrah={umrah} clientName={clientName} files={files} />
    </Table.Row>
  );
}

function Actions({ umrah, clientName, files }) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref: outRef } = useHandleOutsideClick(() => setIsOpen(false));
  const { deleteUmrah } = useDeleteUmrah(clientName);
  const { mutate } = useMutation({
    mutationFn: downLoadUmrahImgs,
    onSuccess: () => toast.success("Files have downloaded successfully"),
    onError: () => toast.error("Faild to download"),
  });
  return (
    <StyledActions>
      <StyledToggle>
        {!isOpen && <PiListBold onClick={() => setIsOpen(!isOpen)} />}
        {isOpen && <PiXBold onClick={() => setIsOpen(!isOpen)} />}
      </StyledToggle>
      {isOpen && (
        <StyledList ref={outRef} position={{ x: 50, y: 0 }}>
          <Modal>
            <Modal.Open opens="delete-umrah">
              <StyledButton>
                <PiTrash /> Delete
              </StyledButton>
            </Modal.Open>
            <Modal.Window name="delete-umrah">
              <ConfirmDelete
                resourceName={`${clientName} order`}
                onConfirm={() => deleteUmrah(umrah.id)}
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
          <StyledButton onClick={() => mutate(files)}>
            <PiDownload />
            DownLoad
          </StyledButton>
        </StyledList>
      )}
    </StyledActions>
  );
}
