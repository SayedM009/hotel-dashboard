import supabase from "./supabase";

export async function getUmrah(obj) {
  const { type, month, year } = obj;
  let query = supabase.from("umrah");

  if (type === "all") {
    let { data: umrah, error } = await query
      .select("*")
      .gte("travelDate", new Date().toISOString());

    if (error) throw new Error(error.message);

    return umrah;
  }

  if (type === "current") {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const { data: umrah, error } = await query
      .select()
      .eq("month", currentMonth)
      .eq("year", currentYear)
      .gte("day", currentDay);

    if (error) throw new Error(error.message);

    return umrah;
  }

  if (type === "spacific" && month && year) {
    const { data: umrah, error } = await query
      .select()
      .eq("month", month)
      .eq("year", year);

    if (error) throw new Error(error.message);

    return umrah;
  }
}

export async function createUmrahAPI(obj) {
  console.log(obj);
  const { data: umrah, error } = await supabase
    .from("umrah")
    .insert([{ ...obj }])
    .select();

  if (error) throw new Error(error.message);

  return umrah;
}
