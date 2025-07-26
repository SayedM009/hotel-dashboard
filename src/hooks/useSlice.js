import { useMemo, useState } from "react";

export default function useSlice(obj) {
  const [count, setCount] = useState(5);

  function handleChangeCount(e) {
    setCount(e.target.value);
  }

  const slicedObj = useMemo(
    () => (obj ? obj.slice(0, count) : []),
    [obj, count]
  );
  return { slicedObj, count, handleChangeCount };
}
