var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");

const poolsRouter = require("./src/routes/pools");
const authRouter = require("./src/routes/auth");
const cuadroRouter = require("./src/routes/cuadro");
const userRouter = require("./src/routes/user");

require("./src/database");
var app = express();

// Configuración de CORS al principio
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json({ limit: "5mb" }));

//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/pools", poolsRouter);
app.use("/auth", authRouter);
app.use("/cuadro", cuadroRouter);
app.use("/user", userRouter);

// Catch 404 y forward al manejador de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

