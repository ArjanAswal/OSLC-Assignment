const mongoose = require('mongoose');
const app = require('./../src/app');

const request = require('supertest');

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[`${collectionName}`];
    await collection.deleteMany();
  }
}

const requirements = [
  {
    title: '1!',
    description: 'A description!',
    priority: 'high',
    url: 'apple.com',
  },
  {
    title: '2!',
    description: 'A description!',
    priority: 'high',
    url: 'google.com',
  },
  {
    title: '3!',
    description: 'A description!',
    priority: 'low',
    url: 'meta.com',
  },
  {
    title: '4!',
    description: 'A description!',
    priority: 'medium',
    url: 'netflix.com',
  },
  {
    title: '5!',
    description: 'A description!',
    priority: 'medium',
    url: 'microsoft.com',
  },
];

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URL ?? 'mongodb://mongodb:27017/node-test'
  );
});

// Seed the database with users
// beforeEach(async () => {
//   await Requirement.create(requirements);
// });

// Cleans up database between each test
afterEach(async () => {
  await removeAllCollections();
});

// Disconnect mongooose
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

test('Should create 5 new requirements', async () => {
  for (let requirement of requirements) {
    const response = await request(app).post('/requirements').send(requirement);
    expect(response.statusCode).toBe(201);
  }
});

test('Delete a requirement', async () => {
  let response = await request(app).post('/requirements').send(requirements[0]);
  expect(response.statusCode).toBe(201);

  response = await request(app).delete(
    '/requirements/' + response.body.data.requirement._id
  );
  expect(response.statusCode).toBe(204);
});

test('Retrieve a specific requirement', async () => {
  let response = await request(app).post('/requirements').send(requirements[0]);
  expect(response.statusCode).toBe(201);

  response = await request(app).get(
    '/requirements/' + response.body.data.requirement._id
  );
  expect(response.statusCode).toBe(200);
});

test('Update a specific requirement', async () => {
  let response = await request(app).post('/requirements').send(requirements[0]);
  expect(response.statusCode).toBe(201);

  response = await request(app)
    .patch('/requirements/' + response.body.data.requirement._id)
    .send({
      title: '5 is now updated!',
      description: 'A description!',
      priority: 'high',
      url: 'microsoft.com',
      tag: 'updated',
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.data.requirement.tag).toBe('updated');
});
