import { PrismaClient } from "@prisma/client";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.findUnique({
    where: { id },
  });
  console.log(review);
  return review;
};

export default getReviewById;
