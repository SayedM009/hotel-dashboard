import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

function useGetCabins() {
  const {
    data: cabins,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, isFetching, error, refetch };
}

export default useGetCabins;
