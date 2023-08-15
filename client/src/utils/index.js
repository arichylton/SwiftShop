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
