import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
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
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
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
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  console.log(isLoading);

  if (isLoading) <Spinner />;
  if (error) return <div>Somthing went wrong!</div>;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("Pages.cabins.all_cabins")}</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
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
      <StyledLink to={`addCabin${location.search}`}>
        <Button style={{ width: "100%" }}>
          <PiPlus />
          {t("Pages.cabins.add_cabin")}
        </Button>
      </StyledLink>
    </>
  );
}
