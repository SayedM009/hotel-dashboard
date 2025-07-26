import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useGetBookings() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const {
    data: bookings,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings", status],
    queryFn: () => getBooking(status),
  });

  return { bookings, isLoading, isFetching, error, refetch };
}
