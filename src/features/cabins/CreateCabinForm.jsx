import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import useCreateEditCabin from "./useCreateEditCabin";
import { PiArrowFatLeft, PiArrowFatRight, PiPlus } from "react-icons/pi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PiPencilSimpleLine } from "react-icons/pi";
import { useTranslation } from "react-i18next";

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

function CreateCabinForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get("type");
  const loaction = useLocation();
  const cabinData = location ? JSON.parse(loaction.state) : null;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: cabinData ? cabinData : {},
  });
  const { name, description, maxCapacity, regulerPrice, discount, image } =
    formState.errors;
  const { createEdit, isPending } = useCreateEditCabin(cabinData, edit);

  function onSubmit(data) {
    createEdit(data);
  }

  return (
    <>
      <Icon onClick={() => navigate(-1)}>
        {i18n.language == "ar" ? <PiArrowFatRight /> : <PiArrowFatLeft />}
        <h6>{t("Pages.cabins.all_cabins")}</h6>
      </Icon>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="name" error={name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: t("Pages.cabins.cabin_name_required"),
            })}
          />
        </FormRow>

        <FormRow label="maxCapacity" error={maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: t("Pages.cabins.max_capacity_required"),
              min: {
                value: 1,
                message: t("Pages.cabins.min_value"),
              },
            })}
          />
        </FormRow>

        <FormRow label="regulerPrice" error={regulerPrice?.message}>
          <Input
            type="number"
            id="regulerPrice"
            {...register("regulerPrice", {
              required: t("Pages.cabins.reguler_price_required"),
              min: {
                value: 1,
                message: t("Pages.cabins.min_value"),
              },
            })}
          />
        </FormRow>

        <FormRow label="discount" error={discount?.message}>
          <Input
            type="number"
            id="discount"
            defaultValue="0"
            {...register("discount", {
              required: t("Pages.cabins.discount_required"),
              validate: (value) =>
                value < getValues().regulerPrice ||
                value <= 0 ||
                t("Pages.cabins.discount_less_than"),
            })}
          />
        </FormRow>

        <FormRow label="description" error={description?.message}>
          <Textarea
            type="number"
            id="description"
            {...register("description", {
              required: t("Pages.cabins.description_required"),
            })}
          />
        </FormRow>

        <FormRow label="image" error={image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required: location ? false : t("Pages.cabins.image_required"),
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            {t("Pages.cabins.cancel")}
          </Button>
          <Button variation="primary" disabled={isPending}>
            {edit && (
              <>
                <PiPencilSimpleLine />
                {t("Pages.cabins.edit_cabin")}
              </>
            )}
            {!edit && (
              <>
                <PiPlus />
                {t("Pages.cabins.add_cabin")}
              </>
            )}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
