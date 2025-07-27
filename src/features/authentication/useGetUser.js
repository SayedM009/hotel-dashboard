import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

function useGetUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user,
    isLoading,
    Authenticated: user?.role === "authenticated",
  };
}

export default useGetUser;
