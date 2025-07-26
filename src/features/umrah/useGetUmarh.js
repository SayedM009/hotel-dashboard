import { useQuery } from "@tanstack/react-query";
import { getUmrahs } from "../../services/apiUmrah";
import { useSearchParams } from "react-router-dom";

function useGetUmrah() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "up coming";
  const FROM = searchParams.get("from") || "";
  const TO = searchParams.get("to") || "";
  const {
    data: umrahs,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["umrah", type],
    queryFn: () => getUmrahs({ FROM, TO }, type),
    refetchOnWindowFocus: false, // لا تعيد الجلب عند الرجوع للنافذة
    refetchOnMount: false, // لا تعيد الجلب عند إعادة mount
    refetchOnReconnect: false, // لا تعيد الجلب عند الاتصال بالإنترنت مجددًا
  });

  return { umrahs, isLoading, isFetching, error, refetch };
}

export default useGetUmrah;
