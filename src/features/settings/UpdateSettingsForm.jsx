import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useGetSettings from "./useGetSettings";
import useUpdateSettings from "./useUpdateSettings";
import Spinner from "../../ui/Spinner";
function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGeustsPerBooking,
      minBookingLength,
    } = {},
  } = useGetSettings();
  const { isPending, updateSettings } = useUpdateSettings();

  function handleUpdateSettings(e, key) {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ [key]: value });
  }

  if (isPending) <Spinner />;
  return (
    <Form>
      <FormRow label="minBookingLength">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSettings(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="minBookingLength">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="maxGeustsPerBooking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGeustsPerBooking}
          onBlur={(e) => handleUpdateSettings(e, "maxGeustsPerBooking")}
        />
      </FormRow>
      <FormRow label="breakfastPrice">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSettings(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
