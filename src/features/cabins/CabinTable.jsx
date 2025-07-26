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
import useSlice from "../../hooks/useSlice";
import StyledSelect from "../../ui/Select";

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
`;

export default function CabinTable() {
  const { t } = useTranslation();
  const { cabins, isFetching, error } = useGetCabins();
  const {
    slicedObj: slicedCabins,
    count,
    handleChangeCount,
  } = useSlice(cabins);
  const { sortedObj: sortedCabins } = useSortBy(slicedCabins, "discount-asc");

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
        {isFetching && <Spinner />}
        {!isFetching && (
          <Table.Body
            data={sortedCabins}
            render={(cabin, index) => (
              <CabinRow cabin={cabin} key={cabin.id} index={index} />
            )}
          />
        )}
      </Table>

      <StyledSelect value={count} onChange={handleChangeCount} type="white">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </StyledSelect>

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
