const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

const db = {
  events: [
    {
      id: 1,
      name: 'Horn Studio Placement Auditions',
      date: '8/26/19',
      location: 'BMH 116'
    },
    {
      id: 2,
      name: 'Thornton Symphony Concert #1',
      date: '9/13/19',
      location: 'Bovard Auditorium'
    },
    {
      id: 3,
      name: 'Outreach chamber music performance',
      date: '9/18/19',
      location: 'LA Braille Institute'
    },
    {
      id: 4,
      name: 'Thornton Symphony Concert #2',
      date: '9/27/19',
      location: 'Bovard Auditorium'
    },
    {
      id: 5,
      name: 'Thornton Edge Concert #1',
      date: '10/7/19',
      location: 'Newman Recital Hall'
    },
    {
      id: 6,
      name: 'Thornton Wind Ensemble Concert #1',
      date: '10/11/19',
      location: 'Bovard Auditorium'
    },
    {
      id: 7,
      name: 'Thornton Concerto Night',
      date: '10/16/19',
      location: 'Bovard Auditorium'
    },
    {
      id: 8,
      name: 'Masterclass with Sarah Willis',
      date: '10/24/19',
      location: 'The Colburn School'
    },
    {
      id: 9,
      name: 'Thornton Wind Ensemble Concert #2',
      date: '11/1/19',
      location: 'Bovard Auditorium'
    },
    {
      id: 10,
      name: 'Masterclass with Robert Ward',
      date: '11/6/19',
      location: 'The Colburn School'
    },
    {
      id: 11,
      name: 'Thornton Chamber Orchestra Concert',
      date: '11/15/19',
      location: 'Bovard Auditorium'
    },
    {
      id: 12,
      name: 'Thornton Edge Concert #2',
      date: '11/19/19',
      location: 'Newman Recital Hall'
    },
    {
      id: 13,
      name: 'Horn Choir Recital',
      date: '11/19/19',
      location: 'Los Angeles Braille Institute'
    },
  ],
  members: [
    {
      undergrads: [
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
    },
    {
      grads: [
        {
          name: 'Will Grace',
          year: 'Masters'
        },
        {
          name: 'Abraham Murillo',
          year: 'Masters'
        },
        {
          name: 'Daniel Skib',
          year: 'Masters'
        },
        {
          name: 'Eun Jin Koh',
          year: 'Graduate Certificate'
        },
        {
          name: 'Christian Thomas',
          year: 'Doctoral'
        },
        {
          name: 'Sean Holmes',
          year: 'Doctoral'
        },
        {
          name: 'Matt Reynolds',
          year: 'Doctoral'
        },
        {
          name: 'Stephanie Ginnings',
          year: 'Doctoral'
        },
        {
          name: 'Jason Chilson',
          year: 'Doctoral'
        },
      ]
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
