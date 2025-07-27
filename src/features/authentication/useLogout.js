import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      toast.success("Visit us again ^_^");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logout, isLoading };
}

export default useLogout;
