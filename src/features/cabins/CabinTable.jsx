import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import useGetCabins from "./useGetCabins";
import CreateCabinForm from "./CreateCabinForm";
import { Link, useLocation } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.5fr 1fr 2fr 1.5fr 1fr 1fr 2fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
`;

export default function CabinTable() {
  const { t } = useTranslation();
  const location = useLocation();
  const { cabins, isLoading, isFetching, error, refetch } = useGetCabins();

  {
    isFetching && !isLoading && <Spinner />;
  }
  if (error) return <div>Somthing went wrong!?</div>;
  return (
    <>
      <Row type="horizontal">
        <div>
          <Heading as="h1">{t("Pages.cabins.all_cabins")}</Heading>
          Count : {cabins && cabins.length}
        </div>
        <p>Filter/Sort</p>
      </Row>
      <Table role="table">
        <TableHeader role="row">
          <div>Id No.</div>
          <div>Image</div>
          <div>{t("Pages.cabins.cabin")}</div>
          <div>{t("Pages.cabins.capacity")}</div>
          <div>{t("Pages.cabins.price")}</div>
          <div>{t("Pages.cabins.discount")}</div>
          <div>{t("Pages.cabins.actions")}</div>
        </TableHeader>
        {cabins?.map((cabin, index) => (
          <CabinRow cabin={cabin} key={cabin.id} index={index} />
        ))}
      </Table>
      {/* <StyledLink to={`addCabin${location.search}`}>
        <Button style={{ width: "100%" }}>
          <PiPlus />
          {t("Pages.cabins.add_cabin")}
        </Button>
      </StyledLink> */}
      {/* <Button
        size="medium"
        onClick={async () => {
          await refetch();
          toast.success("Cabins loaded");
        }}
      >
        Refetch Cabins
      </Button> */}
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

        <Modal.Open opens="table">
          <Button>
            <PiPlus />
            Show Table
          </Button>
        </Modal.Open>
        <Modal.Window name="table">
          <Table role="table">
            <TableHeader role="row">
              <div>Id No.</div>
              <div>Image</div>
              <div>{t("Pages.cabins.cabin")}</div>
              <div>{t("Pages.cabins.capacity")}</div>
              <div>{t("Pages.cabins.price")}</div>
              <div>{t("Pages.cabins.discount")}</div>
              <div>{t("Pages.cabins.actions")}</div>
            </TableHeader>
            {cabins?.map((cabin, index) => (
              <CabinRow cabin={cabin} key={cabin.id} index={index} />
            ))}
          </Table>
        </Modal.Window>
      </Modal>
    </>
  );
}
