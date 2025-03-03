import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};
export default deleteUserById;
