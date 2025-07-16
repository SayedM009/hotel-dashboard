import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { PiTrash } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin, index }) {
  const { t, i18n } = useTranslation();
  const {
    id: cabinId,
    image: src,
    name,
    maxCapacity,
    regulerPrice,
    discount,
  } = cabin;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deletCabin,
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
  return (
    <TableRow>
      <Img src={src} />
      <Cabin>{name}</Cabin>
      <p>Fits up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regulerPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Button
        size="medium"
        onClick={() => {
          if (index === 0) return toast.error("Could not delete this cabin");
          mutate(cabinId);
        }}
        disabled={isPending}
      >
        <PiTrash />
        {t("Pages.cabins.delete")}
      </Button>
    </TableRow>
  );
}
