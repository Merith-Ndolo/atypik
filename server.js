const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user_route");
const postRoutes = require("./routes/post_route");
const paramRoutes = require("./routes/param_route");
const sectionRoutes = require("./routes/section_route");
require("dotenv").config({ path: "./config/.env" });
const db = require("./config/db");
db.conn();
const { checkUser, requireAuth } = require("./middleware/middleware");
const cors = require("cors");
const path = require("path");
const { getFilesStream } = require("./s3");

/*const puppeteer = require("puppeteer");
async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"],
  });
};*/

const app = express();

const cors_options = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: "POST,DELETE,GET,HEAD,PUT,PATCH",
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  preflightContinue: false,
};

app.use(cors(cors_options));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res, next) => {
  res.status(200).send(res.locals.user._id);
  next();
});

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFilesStream(key);

  readStream.pipe(res);
});

// Routes d'accès aux utilisateurs et aux posts
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/param", paramRoutes);
app.use("/api/section", sectionRoutes);

/*app.get("/", (req, res) => {
  res.send("API fonctionnelle");
});*/

app.use(
  express.static("public", {
    etag: true, // Just being explicit about the default.
    lastModified: true, // Just being explicit about the default.
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");

      if (path.endsWith(".html")) {
        // All of the project's HTML files end in .html
        res.setHeader("Cache-Control", "no-cache");
      } else if (hashRegExp.test(path)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader("Cache-Control", "max-age=31536000");
      }
    },
  })
);

//heroku
//path.join ou path.resolve
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

// server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
