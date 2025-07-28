import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export default function useGetBookingsAfterDate() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ["staysAfterDate", numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = stays?.filter((stay) => {
    return stay.status === "checked-in" || stays.status === "checked-out";
  }, 0);
  return { stays, isLoading, confirmedStays, numDays };
}
