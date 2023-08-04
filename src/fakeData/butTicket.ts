import { faker } from '@faker-js/faker';

export function getTimeByDate(date: Date): any{
  console.log('data', date)
  const dateSt = new Date(date);
  console.log(dateSt.getDay())
  const arr = []
  const length = Math.floor(Math.random() * 9) + 2
  const startTime = 12; // Начальное время работы
  const endTime = 20;   // Конечное время работы
  const timeStep = (endTime - startTime) / (length - 1);

  for (let i = 0; i < length; i++) {
    const time = startTime + i * timeStep ;
    arr.push({
      time: Math.round(time) + ':00',
      cinema: faker.random.alphaNumeric(),
      price: faker.commerce.price({ min: 5, max: 20, symbol: '$' }),
    })
  }
  return arr
}