import styled from "styled-components";
import useGetBookingsAfterDate from "./useGetBookingsAfterDate";
import useGetStaysAfterDate from "./useGetStaysAfterDate";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import getCabins from "../../services/apiCabins";
import useGetCabins from "../cabins/useGetCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useGetBookingsAfterDate();
  const {
    stays,
    isLoading: isLoading2,
    confirmedStays,
    numDays,
  } = useGetStaysAfterDate();
  const { cabins, isLoading: isLoading3 } = useGetCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <div>Todays activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}
