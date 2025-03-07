import { PrismaClient } from "@prisma/client";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();

  if (
    !title ||
    !description ||
    !location ||
    !pricePerNight ||
    !bedroomCount ||
    !bathRoomCount ||
    !maxGuestCount ||
    !hostId ||
    !rating
  ) {
    throw new Error("All fields are required");
  }

  const newProperty = {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  };

  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;
