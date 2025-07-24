import supabase from "./supabase";

export default async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return cabins;
}

export async function deleteCabinFn(cabin) {
  const imageName = cabin.image.slice(
    cabin.image.indexOf("cabin-images/") + 13
  );
  const { error: deleteCabin } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabin.id);
  const { error: deleteImage } = await supabase.storage
    .from("cabin-images")
    .remove([`${imageName}`]);

  if (deleteCabin) {
    console.error(deleteCabin.message);
    throw new Error(deleteCabin.message);
  }

  if (deleteImage) {
    console.error(deleteImage.message);
    throw new Error(deleteImage.message);
  }

  return "Cabin deleted successfully";
}

export async function createEditCabin(newCabin, id) {
  const isNotObject = typeof newCabin.image !== "object";
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = isNotObject
    ? newCabin.image
    : `https://tqawvmzchgqpgyarqnmq.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data: cabin, error } = await query.select();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  if (isNotObject) return cabin;

  const { error: fileError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  if (fileError) {
    await supabase.from("cabins").delete().eq("id", cabin.id);
  }

  return cabin;
}

export async function downLoadImage(imgURL) {
  const path = imgURL.replace(
    "https://tqawvmzchgqpgyarqnmq.supabase.co/storage/v1/object/public/cabin-images/",
    ""
  );

  const { data, error } = await supabase.storage
    .from("cabin-images")
    .download(path);

  if (error) {
    console.error("Download error:", error);
    throw error;
  }

  const blob = data;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = path.split("/").pop();
  document.body.appendChild(a);
  a.click();
  a.remove();

  return data;
}
