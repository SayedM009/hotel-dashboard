import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Settings has updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => toast.error(error),
  });
  return { isPending, updateSettings };
}
