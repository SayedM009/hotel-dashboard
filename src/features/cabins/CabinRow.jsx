import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { PiCopySimple, PiDownload, PiTrash } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PiPencilSimpleLine } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";
import useDeleteCabin from "./useDeleteCabin";
import useCreateEditCabin from "./useCreateEditCabin";
import { useMutation } from "@tanstack/react-query";
import { downLoadImage } from "../../services/apiCabins";

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
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function CabinRow({ cabin, index }) {
  const [isImgLoading, setIsImageLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const {
    id: cabinId,
    image: src,
    name,
    maxCapacity,
    regulerPrice,
    discount,
  } = cabin;

  const { deleteCabin, isPending } = useDeleteCabin(name);
  const { createEdit, isPending: isPendingDublicating } = useCreateEditCabin();
  const { isPending: isDownloading, mutate } = useMutation({
    mutationFn: downLoadImage,
    onSuccess: () => {
      toast.success("image downloaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <TableRow>
      <div>
        <Img src={src} onLoad={() => setIsImageLoading(false)} />
        {isImgLoading && <Skeleton height={60} width={100} />}
      </div>
      <Cabin>{name}</Cabin>
      <p>Fits up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regulerPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Actions>
        <Button
          size="large"
          title={t("Pages.cabins.delete")}
          onClick={() => {
            if (index === 0) return toast.error("Could not delete this cabin");
            deleteCabin(cabinId);
          }}
          disabled={isPending}
        >
          <PiTrash />
          {/*  */}
        </Button>
        <Link
          to={`editCabin?type=edit&cabin=${JSON.stringify(cabin)}`}
          state={JSON.stringify(cabin)}
          style={{ width: "100%", display: "block" }}
        >
          <Button size="large" title={t("Pages.cabins.edit_cabin")}>
            <PiPencilSimpleLine />
          </Button>
        </Link>
        <Button
          title={t("Pages.cabins.duplicate")}
          size="large"
          onClick={() => {
            createEdit(
              {
                image: src,
                name: `Copy of ${name}`,
                maxCapacity,
                regulerPrice,
                discount,
              },
              cabinId
            );
          }}
          disabled={isPendingDublicating}
        >
          {/* Duplicate */}
          <PiCopySimple />
        </Button>
        <Button
          title={t("Pages.cabins.duplicate")}
          size="large"
          onClick={() => {
            mutate(src);
          }}
          disabled={isPendingDublicating}
        >
          <PiDownload />
        </Button>
      </Actions>
    </TableRow>
  );
}
