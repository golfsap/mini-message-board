const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Set views folder
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mini-message board app - listening on port ${PORT}`);
});
