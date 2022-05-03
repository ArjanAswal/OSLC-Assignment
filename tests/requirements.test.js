const mongoose = require('mongoose');
const app = require('./../src/app');

const Requirement = require('./../src/models/requirementModel');
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
