import supabase from "./supabase";
import { downLoadImage } from "./apiCabins";
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
      .gte("month", currentMonth)
      .eq("year", currentYear);

    if (error) throw new Error(error.message);

    return umrah;
  }

  if (obj.type === "spacific") {
    const fromISO = new Date(obj.from).toISOString();
    const toDate = new Date(obj.to);
    toDate.setHours(23, 59, 59, 999);
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
  const filesArray = Array.from(obj.files);
  const uploadedURLs = [];

  for (let i = 0; i < filesArray.length; i++) {
    const file = filesArray[i];
    const randomName = `${crypto.randomUUID()}-${file.name}`.replaceAll(
      "/",
      ""
    );
    const path = `${randomName}`;

    // ارفع الملف
    const { error: uploadError } = await supabase.storage
      .from("umrah-files")
      .upload(path, file);

    if (uploadError) throw new Error(`Upload failed for ${file.name}`);
    // خزّن الرابط
    https: uploadedURLs.push(
      `https://tqawvmzchgqpgyarqnmq.supabase.co/storage/v1/object/public/${path}`
    );
  }

  const { data: umrah, error } = await supabase
    .from("umrah")
    .insert([
      {
        ...obj,
        files: uploadedURLs,
      },
    ])
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

export async function downLoadUmrahImgs(urls) {
  for (let i = 0; i < urls.length; i++) {
    try {
      await downLoadImage(urls[i], "umrah-files");
    } catch (error) {
      console.error(`❌ Failed: ${urls[i]}`, error);
    }
  }
}
