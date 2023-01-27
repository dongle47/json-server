

const jsonServer = require('json-server');
// const faker = require('faker')

const { faker } = require('@faker-js/faker');


const queryString = require('query-string');
const fs = require("fs");

faker.locale = 'vi'
const dbFile = 'db.json'

// Start server
const server = jsonServer.create();

const router = jsonServer.router(dbFile);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    req.body.id = faker.random.uuid();

  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }

  // Continue to JSON Server router
  next();
});

// Custom output for LIST with pagination
router.render = (req, res) => {
  const headers = res.getHeaders();

  const totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };


    return res.jsonp(result);
  }

  // Otherwise, keep default behavior
  res.jsonp(res.locals.data);
};

server.use('/api', router);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log('JSON Server is running');
});

