import "./instrument.js";
import express from "express";
import "dotenv/config";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";

import * as Sentry from "@sentry/node";

import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

app.use(log);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error details
  res.status(500).send({ message: "Something went wrong!" }); // Send a generic error message to the client
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
