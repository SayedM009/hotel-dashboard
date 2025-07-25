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
  if (error) return <div>Somthing went wrong!?</div>;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("Pages.cabins.all_cabins")}</Heading>

        <p>Filter/Sort</p>
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
        {cabins?.map((cabin, index) => (
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
