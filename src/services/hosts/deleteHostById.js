import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();

  const host = await prisma.host.delete({
    where: { id },
  });
  console.log(host);
  return host;
};

export default deleteHostById;
