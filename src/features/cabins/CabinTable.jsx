import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import useGetCabins from "./useGetCabins";
import CreateCabinForm from "./CreateCabinForm";
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import Table from "../../ui/Table";
import useSortBy from "../../hooks/useSortBy";
import SortBy from "../../ui/SortBy";

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
`;

export default function CabinTable() {
  const { t } = useTranslation();
  const { cabins, isLoading, isFetching, error } = useGetCabins();

  {
    isFetching && !isLoading && <Spinner />;
  }

  const { sortedObj: sortedCabins } = useSortBy(cabins);

  console.log(sortedCabins);
  if (error) return <div>Somthing went wrong!?</div>;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("Pages.cabins.all_cabins")}</Heading>

        <SortBy
          options={[
            { value: "regularPrice-asc", label: "Sort by Price (low first)" },
            { value: "regularPrice-desc", label: "Sort by Price (high first)" },
            { value: "discount-asc", label: "Sort by discount (low first)" },
            { value: "discount-desc", label: "Sort by discount (high first)" },
          ]}
        />
      </Row>
      <Table columns="0.5fr 1fr 2fr 1.5fr 1fr 1fr 2fr">
        <Table.Header>
          <div>Id No.</div>
          <div>Image</div>
          <div>{t("Pages.cabins.cabin")}</div>
          <div>{t("Pages.cabins.capacity")}</div>
          <div>{t("Pages.cabins.price")}</div>
          <div>{t("Pages.cabins.discount")}</div>
          <div>{t("Pages.cabins.actions")}</div>
        </Table.Header>
        {sortedCabins?.map((cabin, index) => (
          <CabinRow cabin={cabin} key={cabin.id} index={index} />
        ))}
      </Table>

      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>
            <PiPlus />
            {t("Pages.cabins.add_cabin")}
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}
