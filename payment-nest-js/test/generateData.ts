import { faker } from '@faker-js/faker';

export const generateUser = (): {
  name: string;
  email: string;
  password: string;
} => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: '1234',
});

export const generateProduct = (): {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
} => ({
  id: faker.datatype.number(),
  name: faker.name.lastName(),
  price: faker.datatype.number(),
  description: faker.lorem.paragraph(),
  image: faker.image.cats(),
})