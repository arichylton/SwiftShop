export function countOccurrences(arr, targetDocID, targetSize) {
  return arr.filter((item) => item.docID === targetDocID && item.size === targetSize).length;
}

export function addToCartSet(cartItems) {
  const uniqueObjectsMap = new Map();

  cartItems.forEach((obj) => {
    const uniqueKey = `${obj.docID}-${obj.size}`;
    uniqueObjectsMap.set(uniqueKey, obj);
  });

  // Convert the Map values to an array (if needed)
  const uniqueObjectsArray = Array.from(uniqueObjectsMap.values());
  return uniqueObjectsArray;
}

export function isProductNew(product) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in Unix epoch format
  const twoWeeksInSeconds = 2 * 7 * 24 * 60 * 60; // Two weeks in seconds
  return product.dateCreated.seconds > currentTimestamp - twoWeeksInSeconds;
}

export function formatDateToMonthDDYYYY(customDate) {
  const seconds = customDate.seconds;
  const milliseconds = seconds * 1000; // Convert seconds to milliseconds
  const fullDate = new Date(milliseconds);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[fullDate.getMonth()];
  const day = fullDate.getDate();
  const year = fullDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}
