const fs = require('fs');
const dayjs = require('dayjs');

const currentTime = dayjs();
const oneHourLater = currentTime.add(1, 'hour');

const bookingObject = {
  startTime: currentTime,
  finishTime: oneHourLater
  // Add other properties as needed
};

const content = `export const bookingObject = ${JSON.stringify(bookingObject, null, 2)};`;

fs.writeFileSync('bookingData.js', content, 'utf8');

console.log('bookingData.js file created successfully.');
