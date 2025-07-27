// import Heading from "../ui/Heading";
// import Row from "../ui/Row";

import { useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import { getUmrahs } from "../services/apiUmrah";

function Dashboard() {
  // Pre Fetch Bookings
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["bookings", "all", 1],
    queryFn: () => getBooking("all", 1),
    staleTime: 1000 * 60 * 1,
  });

  // Pre Fetch Umrahs
  queryClient.prefetchQuery({
    queryKey: ["umrah", "up coming"],
    queryFn: () => getUmrahs({}, "up coming"),
    staleTime: 1000 * 60 * 1,
  });
  return <div>Dashboard</div>;
}

export default Dashboard;
