import { PrismaClient } from "@prisma/client";

const getUserById = async (id) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id },
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
  console.log(user);
  return user;
};

export default getUserById;
