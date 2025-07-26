import { useSearchParams } from "react-router-dom";

export default function useSortBy(obj) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedObj = obj?.sort((a, b) => (a[field] - b[field]) * modifier);
  return { sortedObj };
}
