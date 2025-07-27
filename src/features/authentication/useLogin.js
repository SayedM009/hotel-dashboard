import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (data) => loginAPI(data),
    onSuccess: (user) => {
      toast.success("Welcome Back " + user.user.email);
      navigate("/dashboard", { replace: true });
    },
    onError: () =>
      toast.error("Faild to login. Email or password is incorrect try again"),
  });
  return { login, isPending };
}

export default useLogin;
