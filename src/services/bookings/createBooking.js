import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  if (
    !userId ||
    !propertyId ||
    !checkinDate ||
    !checkoutDate ||
    !numberOfGuests ||
    !totalPrice ||
    !bookingStatus
  ) {
    throw new Error("All fields are required");
  }
  const newBooking = {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  };

  const booking = await prisma.booking.create({
    data: newBooking,
  });
  return booking;
};

export default createBooking;
