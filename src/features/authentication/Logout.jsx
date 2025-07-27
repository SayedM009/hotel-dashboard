import ButtonIcon from "../../ui/ButtonIcon";
import { PiSignOut } from "react-icons/pi";
import useLogout from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon
      title="Logout"
      onClick={() => {
        console.log("logout");
        logout();
      }}
    >
      {isLoading ? <Spinner /> : <PiSignOut />}
    </ButtonIcon>
  );
}

export default Logout;
