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

export async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: "test@test.com",
    password: "123456",
    options: {
      data: {
        fullName: "sayed",
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUser({ fullName, avatar, password }) {
  // 1. Update Password or Full Name
  let updatedUser;
  if (password) updatedUser = { password };
  if (fullName) updatedUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Remove old avatar if was exsits
  if (data && data.user.user_metadata.avatar) {
    const oldAvatarName = data.user.user_metadata.avatar.replace(
      "https://tqawvmzchgqpgyarqnmq.supabase.co/storage/v1/object/public/avatars/",
      ""
    );

    const { error: errorDeleteAvatar } = await supabase.storage
      .from("avatars")
      .remove([`${oldAvatarName}`]);

    if (errorDeleteAvatar) throw new Error(errorDeleteAvatar.message);
  }

  // 3. Create new avatar name and upload it
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storgError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storgError) throw new Error(storgError.message);

  // 4. Update the user
  const { data: updatedData, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://tqawvmzchgqpgyarqnmq.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedError) throw new Error(updatedError.message);

  return updatedData;
}
