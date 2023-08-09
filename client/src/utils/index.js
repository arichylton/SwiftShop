export function countOccurrences(arr, targetDocID) {
  return arr.filter((item) => item.docID === targetDocID).length;
}

export function addToCartSet(cartItems) {
  const uniqueObjectsMap = new Map();

  cartItems.forEach((obj) => {
    uniqueObjectsMap.set(obj.docID, obj);
  });

  // Convert the Map values to an array (if needed)
  const uniqueObjectsArray = Array.from(uniqueObjectsMap.values());
  return uniqueObjectsArray;
}
