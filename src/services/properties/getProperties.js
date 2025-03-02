import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight: {
        contains: pricePerNight,
      },
      amenities: {
        contains: amenities,
      },
    },
  });
  console.log(properties);

  return properties;
};

export default getProperties;
