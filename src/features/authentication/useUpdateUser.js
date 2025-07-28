import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updatedUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updatedUserAPI,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isPending };
}

export default useUpdateUser;
