import { PrismaClient } from "@prisma/client";

const getAmenities = async (name) => {
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany();
  //   console.log(amenities);

  return amenities;
};

export default getAmenities;
