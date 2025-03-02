import { Router } from "express";

import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";

import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReviewById(id);
  if (!review) {
    res.status(404).json({ message: `Review with id ${id} was not found.` });
  } else {
    res.status(200).json(review);
  }
});

router.post("/", auth, async (req, res, next) => {
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = await createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;

    const review = await updateReviewById(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
