const bal = document.getElementById("bal");
const jobb = document.getElementById("jobb");
const datum = document.getElementById("datum");
const maidatum = document.getElementById("maidatum");
const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
const nevnapurl = "https://api.nevnapok.eu/nap/";

const honapok = {
    01: 31,
    02: 28,
    03: 31,
    04: 30,
    05: 31,
    06: 30,
    07: 31,
    08: 31,
    09: 30,
    10: 31,
    11: 30,
    12: 31,
};

let date = new Date();
let year = date.getFullYear();
let day = date.getDate();
let month = date.getMonth() + 1;

function checkYear() {
    if ( year % 4 == 0 ) {
        honapok[02] = 29;
    }else {
        honapok[02] = 28;
    }
}

function addzero(number) {
    if ( number < 10 ) {
        number = '0' + number;
    }
    return number;
}

function datum_api() {
    let current = addzero(month) + "-" + addzero(day);
    return current;
  }

function datum_szoveges() {
    let current = year + " " + months[month-1] + " " + addzero(day) + ".";
    return current;
}

async function nevnapData(nap) {
    try {
        const response = await fetch(nevnapurl + nap);
        const data = await response.text();
        json = JSON.parse(data);
        jsonvalues = Object.values(json);
        arrayvalues = jsonvalues.toString().split(",")
        string = "";
        arrayvalues.forEach(function (item, index) {
            string = string + item + "<br />";
        });
        nevnapok.innerHTML = string;
    }
    catch(err) {
        nevnapok.innerHTML = "A nevnap api nem elerheto.... " + err.message;
    }
}

jobb.onclick = function() {
    if ( day == honapok[month] ) {
        if ( month == 12 ) {
            month = 1;
            day = 1;
            year = year + 1;
        }else {
            month = month + 1;
            day = 1;
        }
    } else {
        day = day + 1;
    }
    checkYear();
    dat = year + "-" + addzero(month) + "-" + addzero(day);
    datum.innerText = datum_szoveges();
    nevnapData(datum_api())
}

bal.onclick = function() {
    if ( day == '01' ) {
        if ( month == '01' ) {
            month = 12;
            day = honapok[month];
            year = year - 1;
        }else {
            month = month - 1;
            day = honapok[month];
        }
    } else {
        day = day - 1;
    }
    checkYear();
    dat = year + "-" + addzero(month) + "-" + addzero(day);
    datum.innerText = datum_szoveges();
    nevnapData(datum_api());
}

maidatum.innerText = datum_szoveges();
datum.innerText = datum_szoveges();
nevnapData(datum_api());