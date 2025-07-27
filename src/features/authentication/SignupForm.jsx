import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useTranslation } from "react-i18next";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { t } = useTranslation();
  const { register, getValues, formState, handleSubmit } = useForm();
  const { errors } = formState;
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Pages.users.fullName" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: t("Pages.users.fullName_required"),
          })}
        />
      </FormRow>

      <FormRow label="Pages.users.email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: t("Pages.users.email_required"),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t("Pages.users.email_not_valid"),
            },
          })}
        />
      </FormRow>

      <FormRow label="Pages.users.password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: t("Pages.users.password_required"),
            minLength: {
              value: 8,
              message: t("Pages.users.password_required"),
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Pages.users.passwordConfirm"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: t("Pages.users.passwordConfirm_required"),
            validate: (value) =>
              value === getValues("password") ||
              t("Pages.users.passwordConfirm_required"),
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
