import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const newReview = {
    userId,
    propertyId,
    rating,
    comment,
  };

  if (!userId || !propertyId || !rating || !comment) {
    throw new Error("All fields are required");
  }

  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
