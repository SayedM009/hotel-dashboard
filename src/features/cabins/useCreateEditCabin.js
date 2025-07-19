import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useCreateEditCabin(cabinData, edit) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createEdit, isPending } = useMutation({
    mutationFn: (data) => {
      if (edit) return createEditCabin(data, cabinData.id);
      if (!edit) return createEditCabin(data);
    },
    onSuccess: () => {
      toast.success(
        edit
          ? `${t("Pages.cabins.edit_cabin_success")}`
          : `${t("Pages.cabins.add_cabin_success")}`
      );
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      navigate("/cabins");
    },
    onError: (error) => toast.error(`${error}`),
  });
  return { createEdit, isPending };
}

export default useCreateEditCabin;
