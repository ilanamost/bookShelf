function loadJSON(fileName) {
  return fetch(`/data/${fileName}.json`).then((res) => {
    return res.json();
  });
}

function getNextId(items) {
  var max = 0;
  items.forEach((item) => {
      if (item.id > max) max = item.id;
  })
  return max+1;
}

export default {
  loadJSON,
  getNextId
};
