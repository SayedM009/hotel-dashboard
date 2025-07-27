import ButtonIcon from "../../ui/ButtonIcon";
import { PiSignOut } from "react-icons/pi";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isPending: isLoading } = useLogout();
  return (
    <ButtonIcon
      title="Logout"
      onClick={() => {
        console.log("logout");
        logout();
      }}
    >
      {isLoading ? <SpinnerMini /> : <PiSignOut />}
    </ButtonIcon>
  );
}

export default Logout;
