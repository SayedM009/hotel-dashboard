import Row from "../ui/Row";

import { Outlet } from "react-router-dom";

function Cabins() {
  return (
    <Row>
      <Outlet />
    </Row>
  );
}

export default Cabins;
