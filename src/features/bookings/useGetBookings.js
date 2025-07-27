import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const {
    data: { data: bookings, count } = {},
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings", status, page],
    queryFn: () => getBooking(status, page),
    staleTime: 5 * 60 * 1000, // نفس الـ staleTimeو
    keepPreviousData: true, // مهم جدًا للـ pagination
  });

  const pageCount = Math.ceil(count / 10); // Assuming 10 items per page

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, page + 1],
      queryFn: () => getBooking(status, Number(page) + 1),
      staleTime: 5 * 60 * 1000,
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, page - 1],
      queryFn: () => getBooking(status, page - 1),
      staleTime: 5 * 60 * 1000,
    });
  }

  return { bookings, count, isLoading, isFetching, error, refetch };
}
