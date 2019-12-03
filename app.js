const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

const db = {
  events: [
    {
      id: 1,
      name: 'event 1',
      date: 'mm/dd/yy',
      location: 'place'
    },
    {
      id: 2,
      name: 'event 2',
      date: 'mm/dd/yy',
      location: 'place'
    }
  ],
  members: [
    {
      name: 'James Edwards',
      year: 'Freshman'
    },
    {
      name: 'Sophie Barnard',
      year: 'Sophomore'
    },
    {
      name: 'Rachel Kim',
      year: 'Sophomore'
    },
    {
      name: 'Alex Liang',
      year: 'Junior'
    },
    {
      name: 'Elizabeth Li',
      year: 'Junior'
    },
    {
      name: 'Killian Mulrooney',
      year: 'Junior'
    },
    {
      name: 'Daniel Seaman',
      year: 'Senior'
    },
    {
      name: 'Malik Taylor',
      year: 'Senior'
    }
  ]
};

app.get('/api/members', (request, response) => {
  response.json(db.members);
});

app.get('/api/events', (request, response) => {
  response.json(db.events);
});

app.get('/api/events/:id', (request, response) => {
  const id = Number(request.params.id);
  const eventObject = db.events.find((eventObject) => {
    return eventObject.id === id;
  });

  if (eventObject) {
    response.json(eventObject);
  } else {
    response.status(404).send();
  }
});

app.post('/api/events', (request, response) => {
  const eventObject = request.body;
  eventObject.id = db.events.length + 1;
  db.events.push(eventObject);
  response.json(eventObject);
})

app.delete('/api/events/:id', (request, response) => {
  const id = Number(request.params.id);
  const eventObject = db.events.find((eventObject => {
    return eventObject.id === id;
  }));

  if (eventObject) {
    db.events = db.events.filter((eventObject) => {
      return eventObject.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
})

app.put('/api/events/:id', (request, response) => {
  const id = Number(request.params.id);
  const eventObject = db.events.find((eventObject => {
    return eventObject.id === id;
  }));

  if (eventObject) {
    Object.assign(eventObject, request.body);
    response.json(eventObject);
  } else {
    response.status(404).send();
  }
})

app.listen(process.env.PORT || 8000);
