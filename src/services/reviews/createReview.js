import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const newReview = {
    userId,
    propertyId,
    rating,
    comment,
  };
  // need to add check if user already exists

  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
