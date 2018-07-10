// ide deklaráljátok a függvényeket.
function costInCredits(data) {
  var i = data.length - 1;
  var change;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (Number(data[j].cost_in_credits) > Number(data[j + 1].cost_in_credits)) {
        [(data[j]), (data[j + 1])] = [(data[j + 1]), (data[j])];
        change = j;
      }
    } i = change;
  } return data;
}

function deleteNull(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].consumables == null || data[i].consumables === null) {
      data.splice(i, 1);
    }
  } return data;
}

function unknownchange(data) {
  for (var i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      if (data[i][key] === null || data[i][key] == null) {
        data[i][key] = 'unknown';
      }
    }
  } return data;
}

function zerochange(data) {
  for (var i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      if (data[i][key] === 'unknown' || data[i][key] == 'unknown') {
        data[i][key] = '0';
      }
    }
  } return data;
}

function crewnumber(data) {
  var crewsum = 0;
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].crew) == 1) {
      crewsum += 1;
    }
  } return crewsum;
}

function cargocapacity(data) {
  var cargomax = data[0].cargo_capacity;
  var cargooutput = data[0].model;
  for (var j in data) {
    if (Number(data[j].cargo_capacity) > cargomax) {
      cargomax = data[j].cargo_capacity;
      cargooutput = data[j].model;
    }
  } return cargooutput;
}

function passengersSum(data) {
  var passsum = 0;
  for (var i = 0; i < data.length; i++) {
    passsum += parseInt(data[i].passengers);
  } return passsum;
}

function shipLength(data) {
  var lengthen = data[0].lengthiness;
  for (var j in data) {
    if (parseInt(data[j].lengthiness) > lengthen) {
      lengthen = data[j].image;
    }
  } return lengthen;
}

function unknown2change(data) {
  for (var i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      if (data[i][key] == '0') {
        data[i][key] = 'unknown';
      }
    }
  } return data;
}

function arrayReturn(data) {
  var select = document.querySelector('#search-text').value;
  var found = select.toLowerCase();
  for (var i = 0; i < data.length; i++) {
    if (data[i].model.toLowerCase().indexOf(found) > -1) {
      result = data[i];
      break;
    } else {result = 'Unknown spaceship';}
  } return result;
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  var costArrange = costInCredits(userDatas);
  var nullOut = deleteNull(costArrange);
  var unknown = unknownchange(nullOut);
  var unknownto0 = zerochange(unknown);
  var crew = crewnumber(unknownto0);
  console.log(crew);
  var cargo = cargocapacity(unknownto0);
  console.log(cargo);
  var passengers = passengersSum(unknownto0);
  console.log(passengers);
  var length = shipLength(unknownto0);
  console.log(length);
  var returnArray = unknown2change(unknownto0);
  console.log(returnArray);
  var resultArray = arrayReturn(returnArray);
  console.log(resultArray);
}

getData('/json/spaceships.json', successAjax);
