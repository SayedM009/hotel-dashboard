import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUmrahAPI } from "../../services/apiUmrah";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useCreateUmrah() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createUmrah, isPending } = useMutation({
    mutationFn: createUmrahAPI,
    onSuccess: () => {
      toast.success("Umrah Added Successfully");
      // queryClient.setQueryData(["cabins"], (oldCabins) => {
      //   if (!oldCabins) return;

      //   return edit
      //     ? oldCabins.map((cabin) => (cabin.id === data.id ? data : cabin))
      //     : [...oldCabins, { ...data }];
      // });
      queryClient.invalidateQueries({
        queryKey: ["umrah"],
      });
      navigate("/umrah");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
      console.error(error);
    },
  });
  return { createUmrah, isPending };
}

export default useCreateUmrah;
