import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where: {
      username: username,
      email: email,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      bookings: true,
      reviews: true,
    },
  });
  console.log(users);

  return users;
};

export default getUsers;
