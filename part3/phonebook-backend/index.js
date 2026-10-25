require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./phonebook");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("type", function (req, res) {
  return req.body ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time[digits] ms :type",
  ),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// PERSONS API

// GET all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// GET info about the phonebook
app.get("/api/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    response.send(`
      Phonebook has info for ${count} people <br>
      ${new Date()}
      `);
  });
});

// POST a new person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(400).json({
        error: "Name must be unique",
      });
    } else {
      const newPerson = new Person({
        name: body.name,
        number: body.number,
      });

      newPerson.save().then((savedPerson) => {
        response.status(201).json(savedPerson);
      });
    }
  });
});

// GET a person by ID
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// PUT (update) a person by ID`
app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = body.name;
      person.number = body.number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

// DELETE a person by ID
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// OTHER MIDDLEWARE
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
