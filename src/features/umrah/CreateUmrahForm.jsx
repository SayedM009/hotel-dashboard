/* eslint-disable react/prop-types */
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import StyledSelect from "../../ui/Select";
import { PiArrowFatLeft, PiArrowFatRight, PiPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useCreateUmrah from "./useCreateUmrah";
import useEditUmrah from "./useEditUmrah";
import { memo } from "react";

const Icon = styled.div`
  font-size: 36px;
  cursor: pointer;
  width: fit-content;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  transition: 0.3s all ease-in-out;
  &:hover {
    text-decoration: underline;
  }
`;

function CreateUmrahForm({ umrah, onCloseModal }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: umrah
      ? {
          ...umrah,
          travelDate: new Date(umrah.travelDate).toISOString().split("T")[0],
        }
      : {},
  });
  const {
    clientName,
    serviceType,
    totalPrice,
    received,
    profit,
    employeeName,
    status,
    servicePaymentStatus,
    travelDate,
    image,
  } = formState.errors;
  const { createUmrah, isPending } = useCreateUmrah();
  const { updateUmrah } = useEditUmrah();

  function onSubmit(data) {
    if (umrah) {
      const date = new Date(umrah.travelDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const newData = {
        ...data,
        day,
        month,
        year,
      };
      updateUmrah(newData);
    }

    if (!umrah) {
      const date = new Date(data.travelDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const newData = {
        ...data,
        day,
        month,
        year,
      };
      createUmrah(newData, {
        onSuccess: () => {
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <>
      <Icon
        onClick={() => {
          navigate("/umrah");
          onCloseModal?.();
        }}
      >
        {i18n.language == "ar" ? <PiArrowFatRight /> : <PiArrowFatLeft />}
        <h6>All Umrah Orders</h6>
      </Icon>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Pages.umrah.clientName" error={clientName?.message}>
          <Input
            type="text"
            id="clientName"
            {...register("clientName", {
              required: t("Pages.umrah.client_name_required"),
            })}
          />
        </FormRow>

        <FormRow label="Pages.umrah.service_type" error={serviceType?.message}>
          <StyledSelect
            id="serviceType"
            {...register("serviceType", {
              required: t("Pages.umrah.service_type_required"),
            })}
          >
            <option></option>
            <option value="umrah">Umrah</option>
            <option value="visa">Visa</option>
          </StyledSelect>
        </FormRow>

        <FormRow label="Pages.umrah.total_price" error={totalPrice?.message}>
          <Input
            type="number"
            id="totalPrice"
            {...register("totalPrice", {
              required: t("Pages.umrah.total_price_required"),
              valueAsNumber: true,
              min: {
                value: 25,
                message: t("Pages.umrah.total_price_min_value"),
              },
            })}
          />
        </FormRow>

        <FormRow label="Pages.umrah.received" error={received?.message}>
          <Input
            type="number"
            id="received"
            defaultValue="0"
            min="0"
            {...register("received", {
              required: t("Pages.umrah.received_required"),
              valueAsNumber: true,
              min: {
                value: 0,
                message: t("Pages.umrah.received_min_value"),
              },
              validate: (value) =>
                value <= watch("totalPrice") ||
                t("Pages.umrah.received_bigger_total_price"),
            })}
          />
        </FormRow>

        <FormRow label="Pages.umrah.profit" error={profit?.message}>
          <Input
            type="number"
            id="profit"
            {...register("profit", {
              required: t("Pages.umrah.profit_required"),
              valueAsNumber: true,
              min: {
                value: 25,
                message: t("Pages.umrah.profit_min_value"),
              },
              validate: (value) =>
                value <= watch("totalPrice") ||
                t("Pages.umrah.profit_bigger_total_price"),
            })}
          />
        </FormRow>

        <FormRow label="Pages.umrah.employeeName" error={employeeName?.message}>
          <StyledSelect
            id="employeeName"
            {...register("employeeName", {
              required: t("Pages.umrah.employee_name_required"),
            })}
          >
            <option></option>
            <option value="nur">Nur</option>
          </StyledSelect>
        </FormRow>

        <FormRow label="Pages.umrah.status" error={status?.message}>
          <StyledSelect
            id="staus"
            {...register("status", {
              required: t("Pages.umrah.status_required"),
            })}
          >
            <option></option>
            <option value="processing">Processing</option>
            <option value="finished">Finished</option>
            <option value="canceled">Canceled</option>
          </StyledSelect>
        </FormRow>

        <FormRow
          label="Pages.umrah.servicePaymentStatus"
          error={servicePaymentStatus?.message}
        >
          <StyledSelect
            id="servicePaymentStatus"
            {...register("servicePaymentStatus", {
              required: t("Pages.umrah.service_payment_status_required"),
              validate: (value) => {
                if (value == "paid")
                  return (
                    watch("received") >= watch("totalPrice") ||
                    "Can not be paid until we receive 100% "
                  );

                if (value === "down payment")
                  return (
                    !(watch("received") >= watch("totalPrice")) ||
                    "Can not be down payment because we received the total amount or more change it to paid "
                  );
              },
            })}
          >
            <option></option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="canceled">Canceled</option>
            <option value="down payment">Down Payment</option>
          </StyledSelect>
        </FormRow>

        <FormRow label="Pages.umrah.travelDate" error={travelDate?.message}>
          <Input
            type="date"
            id="travelDate"
            min={new Date().toISOString().split("T")[0]}
            {...register("travelDate", {
              required: t("Pages.umrah.travel_date_required"),
            })}
          />
        </FormRow>

        <FormRow>
          <FileInput multiple id="files" {...register("files")} />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            {t("Pages.cabins.cancel")}
          </Button>
          <Button variation="primary" disabled={isPending}>
            <PiPlus />
            Add order
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default memo(CreateUmrahForm);
