import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { PiArrowFatLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin has added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      navigate(-1);
    },
    onError: (error) => toast.error(`${error}`),
  });
  function onSubmit(data) {
    mutate(data);
  }
  return (
    <>
      <Icon onClick={() => navigate(-1)}>
        <PiArrowFatLeft />
        <h6>All Cabins</h6>
      </Icon>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="name">Cabin name</Label>
          <Input type="text" id="name" {...register("name")} />
        </FormRow>

        <FormRow>
          <Label htmlFor="maxCapacity">Maximum capacity</Label>
          <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
        </FormRow>

        <FormRow>
          <Label htmlFor="regulerPrice">Regular price</Label>
          <Input
            type="number"
            id="regulerPrice"
            {...register("regulerPrice")}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="discount">Discount</Label>
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount")}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="description">Description for website</Label>
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            {...register("description")}
          />
        </FormRow>

        {/* <FormRow>
          <Label htmlFor="image">Cabin photo</Label>
          <FileInput id="image" accept="image/*" />
        </FormRow> */}

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button variation="primary">Edit cabin</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
