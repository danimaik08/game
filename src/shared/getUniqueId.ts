const getUniqueId = (function () {
  let lastUniqueId: string = '';
  let amountGivenSameId = 0;

  return function getUniqueId() {
    const id = Date.now() + '';

    if (lastUniqueId === id) {
      amountGivenSameId++;

      return lastUniqueId + ' ' + amountGivenSameId;
    }

    lastUniqueId = id;

    return id;
  };
})();

export default getUniqueId;
