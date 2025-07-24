import { useQuery } from "@tanstack/react-query";
import { getUmrahs } from "../../services/apiUmrah";

function useGetUmrah(obj) {
  const {
    data: umrahs,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["umrah", obj.type],
    queryFn: () => getUmrahs(obj),
    refetchOnWindowFocus: false, // لا تعيد الجلب عند الرجوع للنافذة
    refetchOnMount: false, // لا تعيد الجلب عند إعادة mount
    refetchOnReconnect: false, // لا تعيد الجلب عند الاتصال بالإنترنت مجددًا
  });

  return { umrahs, isLoading, isFetching, error, refetch };
}

export default useGetUmrah;
