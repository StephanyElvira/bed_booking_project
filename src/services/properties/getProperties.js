import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  console.log({ location, pricePerNight, amenities });
  const properties = await prisma.property.findMany({
    where: {
      location: location
        ? {
            contains: location,
          }
        : undefined,
      pricePerNight: pricePerNight
        ? {
            equals: parseFloat(pricePerNight),
          }
        : undefined,
      amenities: amenities
        ? {
            contains: amenities,
          }
        : undefined,
    },
  });
  // console.log(properties);

  return properties;
};

export default getProperties;
