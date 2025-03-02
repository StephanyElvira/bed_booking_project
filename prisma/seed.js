import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { bookings } = bookingData;
  const { amenities } = amenityData;
  const { reviews } = reviewData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  console.log("📌 Users completed");

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }
  console.log("📌 Hosts completed!");

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
        host: {
          connect: { id: property.hostId },
        },
      },
    });
  }
  console.log("📌 Properties completed!");

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
        user: {
          connect: { id: booking.userId },
        },
        property: {
          connect: { id: booking.propertyId },
        },
      },
    });
  }
  console.log("📌 Bookings completed!");

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }
  console.log("📌 Amenities completed!");

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: {
          connect: { id: review.userId },
        },
        property: {
          connect: { id: review.propertyId },
        },
      },
    });
  }
  console.log("📌 Reviews completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
