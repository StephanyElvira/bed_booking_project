import { PrismaClient } from "@prisma/client";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.findUnique({
    where: { id },
  });
  console.log(property);
  return property;
};

export default getPropertyById;
