const express = require("express");
const path = require("path");
const chalk = require("chalk");
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// const basePath = path.join(__dirname, "pages");

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
  // res.sendFile(path.join(basePath, "index.html"));
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
  // res.sendFile(path.join(basePath, "index.html"));
});

app.delete("/:id", async (req, res) => {
  // console.log("id", req.params.id);
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title })
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port} ... `));
});
