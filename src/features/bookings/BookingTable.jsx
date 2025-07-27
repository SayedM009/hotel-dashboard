import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import useGetBookings from "./useGetBookings";
import useSortBy from "../../hooks/useSortBy";
import Spinner from "../../ui/Spinner";
import useSlice from "../../hooks/useSlice";
import StyledSelect from "../../ui/Select";
import Row from "../../ui/Row";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, count, isFetching } = useGetBookings();
  // const {
  //   slicedObj: slidedBookings,
  //   count,
  //   handleChangeCount,
  // } = useSlice(bookings);
  const { sortedObj: sortedBookings } = useSortBy(bookings, "totalPrice-asc");
  return (
    <>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {/* {isFetching && <Spinner />} */}

        <Table.Body
          noData={{
            heading: "No Bookings Found",
            text: "Please add a new booking order to get started",
          }}
          data={sortedBookings || []}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
      {/* <Row type="horizontal">
        <p>
          Showing{" "}
          <strong>
            {String(
              count > bookings?.length ? bookings?.length : count
            ).padStart(2, 0)}
          </strong>{" "}
          of <strong>{String(bookings?.length).padStart(2, 0)}</strong>
        </p>
        <StyledSelect value={count} onChange={handleChangeCount} type="white">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </StyledSelect>
      </Row> */}
    </>
  );
}

export default BookingTable;
