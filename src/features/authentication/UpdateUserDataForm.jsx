import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useGetUser from "./useGetUser";
import useUpdateUser from "./useUpdateUser";
import toast from "react-hot-toast";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useGetUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isPending } = useUpdateUser();
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) {
      toast.error("Full name is required");
      return;
    }
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setFullName(currentFullName);
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Pages.users.email">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Pages.users.fullName">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Pages.users.avatar">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isPending}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
