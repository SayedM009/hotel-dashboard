import supabase from "./supabase";

export async function getUmrahs(obj) {
  let query = supabase.from("umrah");

  if (obj.type === "all") {
    const { data: umrah, error } = await query.select("*");

    if (error) throw new Error(error.message);

    return umrah;
  }

  if (obj.type === "up coming") {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const { data: umrah, error } = await query
      .select()
      .eq("month", currentMonth + 1)
      .eq("year", currentYear);

    if (error) throw new Error(error.message);

    return umrah;
  }

  if (obj.type === "spacific") {
    const fromISO = new Date(obj.from).toISOString(); // e.g. 2025-08-01T00:00:00.000Z
    const toDate = new Date(obj.to);
    toDate.setHours(23, 59, 59, 999); // 31st August 23:59:59.999
    const toISO = toDate.toISOString();

    const { data: umrah, error } = await query
      .select()
      .gte("travelDate", fromISO)
      .lte("travelDate", toISO);

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

export async function deleteUmrahAPI(id) {
  const { error } = await supabase.from("umrah").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updateUmrahAPI(obj) {
  const { data: umrah, error } = await supabase
    .from("umrah")
    .update({ ...obj })
    .eq("id", obj.id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return umrah;
}
