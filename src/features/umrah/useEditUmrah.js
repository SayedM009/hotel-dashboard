import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUmrahAPI } from "../../services/apiUmrah";
import toast from "react-hot-toast";

function useEditUmrah() {
  const queryClient = useQueryClient();
  const { mutate: updateUmrah, isPending } = useMutation({
    mutationFn: updateUmrahAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["umrah"] });
      queryClient.setQueryData(["umrah", data[0].id], data);
      toast.success("Umrah updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating Umrah:", error.message);
      toast.error(`Error updating Umrah: ${error.message}`);
    },
  });
  return {
    updateUmrah,
    isPending,
  };
}

export default useEditUmrah;
