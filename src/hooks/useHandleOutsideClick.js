import { useEffect, useRef } from "react";

function useHandleOutsideClick(callBack) {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callBack();
      }
    }
    document.addEventListener("click", handleOutsideClick, true);

    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, [callBack]);
  return { ref };
}

export default useHandleOutsideClick;
