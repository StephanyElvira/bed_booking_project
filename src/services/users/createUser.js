import { PrismaClient } from "@prisma/client";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !phoneNumber ||
    !profilePicture
  ) {
    throw new Error("All fields are required");
  }

  const newUser = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
  };

  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
