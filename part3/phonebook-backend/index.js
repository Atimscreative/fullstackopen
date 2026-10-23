const express = require("express");
const app = express();

app.use(express.json());

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

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

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

// const generateID = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

// app.post("/api/notes", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     response.status(404).json({
//       error: "content missing!!!",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateID(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

// app.get("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   const note = notes.find((note) => note.id === id);

//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

// PERSONS API
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  response.send(`
    Phonebook has info for ${persons.length} people <br>
    ${new Date()}
    `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: "Person not found" });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length > 0) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: "Person not found" });
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase(),
  );

  if (existingPerson) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
