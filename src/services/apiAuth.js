import { addDays } from "date-fns";
import supabase from "./supabase";
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
// const APIKEY =
//   "c92e21e1a490977e17765e866f6c140f5cc8a4174e7468a06b817d09f82a6766";
// export async function getLiveMatches() {
//   try {
//     const res = await fetch(
//       `https://apiv3.apifootball.com/?action=get_events&from=2025-07-27&to=2025-07-27&APIkey=${APIKEY}`
//     );

//     const data = await res.json();
//     console.log(
//       data.filter((match) => match.match_live === "1" && match.country_id == 62)
//     );
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getLiveMatches();
