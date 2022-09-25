let mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected with the database");
  })
  .catch((error) => {
    console.log(error);
  });
