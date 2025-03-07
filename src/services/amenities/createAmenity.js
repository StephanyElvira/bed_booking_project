import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  const newAmenity = { name };

  if (!name) {
    throw new Error("All fields are required");
  }

  const amenity = await prisma.amenity.create({ data: newAmenity });

  return amenity;
};

export default createAmenity;
