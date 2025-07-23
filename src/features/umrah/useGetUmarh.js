import { useQuery } from "@tanstack/react-query";
import { getUmrah } from "../../services/apiUmrah";

function useGetCabins(obj) {
  const {
    data: umrahs,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["umrah", obj],
    queryFn: () => getUmrah(obj),
    refetchOnReconnect: false,
  });

  return { umrahs, isLoading, isFetching, error, refetch };
}

export default useGetCabins;
