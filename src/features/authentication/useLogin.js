import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (data) => loginAPI(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Welcome Back " + user.user.email);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
  return { login, isPending };
}

export default useLogin;
