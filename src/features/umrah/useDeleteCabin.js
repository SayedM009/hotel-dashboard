import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUmrahAPI } from "../../services/apiUmrah";
import toast from "react-hot-toast";

// 1. Getting cabin id
// 2. Preventing all current refetches
// 3. Save a copy from the currect cache
// 4. Update the current cache with the new data
// 5. Return the the old cache copy
// 6. On Error return the old cache
// 7. On Satteled refech from API and save cache

function useDeleteUmrah(clientName) {
  const queryClient = useQueryClient();
  const { mutate: deleteUmrah } = useMutation({
    mutationFn: deleteUmrahAPI,
    onSuccess: () => {
      toast.success(`Umrah ${clientName}'s order deleted sucessfully`);
      queryClient.invalidateQueries(["umarh"]);
    },
    onError: (error) => {
      toast.error(error || error.message);
    },
  });

  return { deleteUmrah };
}

export default useDeleteUmrah;
