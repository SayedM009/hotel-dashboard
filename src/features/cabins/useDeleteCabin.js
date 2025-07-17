import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin(name) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isPending } = useMutation({
    mutationFn: deleteCabinFn,
    onSuccess: () => {
      toast.success(`${name} ${t("Pages.cabins.delete_cabin_success")}`, {
        duration: 5000,
      });
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error),
  });
  return { deleteCabin, isPending };
}

export default useDeleteCabin;
