import supabase from "./supabase";

export default async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return cabins;
}

export async function deletCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return "Cabin deleted successfully";
}

export async function createCabin(newCabin) {
  const { data: cabin, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return cabin;
}
