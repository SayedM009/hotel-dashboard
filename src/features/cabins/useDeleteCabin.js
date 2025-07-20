import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

// 1. Getting cabin id
// 2. Preventing all current refetches
// 3. Save a copy from the currect cache
// 4. Update the current cache with the new data
// 5. Return the the old cache copy
// 6. On Error return the old cache
// 7. On Satteled refech from API and save cache

function useDeleteCabin(name) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending } = useMutation({
    mutationFn: deleteCabinFn,
    // 1. Getting cabin id
    onMutate: async (deletedCabinId) => {
      // 2. Preventing all current refetches
      await queryClient.cancelQueries(["cabins"]);
      // 3. Save a copy from the currect cache
      const oldCache = queryClient.getQueryData(["cabins"]);
      // 4. Update the current cache with the new data
      queryClient.setQueryData(["cabins"], (cabins) => {
        return cabins.filter((cabin) => cabin.id !== deletedCabinId);
      });
      // 5. Return the the old cache copy
      return { oldCache };
    },
    // 6. On Error return the old cache
    onError: (error, context) => {
      queryClient.setQueryData(["cabins", context.oldCache]);
      toast.error(error.message);
      console.error(error);
    },
    // 7. On Satteled refech from API and save cache
    onSettled: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success(`${name} ${t("Pages.cabins.delete_cabin_success")}`, {
        duration: 5000,
      });
    },
  });
  return { deleteCabin, isPending };
}

export default useDeleteCabin;
