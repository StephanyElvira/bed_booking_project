import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany();
  console.log(reviews);

  return reviews;
};

export default getReviews;
