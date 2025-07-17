import supabase from "./supabase";

export default async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return cabins;
}

export async function deleteCabinFn(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return "Cabin deleted successfully";
}

export async function createEditCabin(newCabin, id) {
  const hasImage = Object.keys(newCabin.image)
    ? false
    : newCabin?.image?.startsWith("https://tqawvmzchgqpgyarqnmq.supabase.co");

  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImage
    ? newCabin.image
    : `https://tqawvmzchgqpgyarqnmq.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { cabin, error } = await query.select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const { error: fileError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  if (fileError) {
    await supabase.from("cabins").delete().eq("id", cabin.id);
  }

  return cabin;
}
