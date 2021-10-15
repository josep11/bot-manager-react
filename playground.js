let APIData = [
    {
        "sk": "#DATE#2021-10-14",
        "date": "ahir",
        "pk": "LR#Wallapop",
        "name": "Wallapop"
    },
    {
        "sk": "#DATE#2021-10-15",
        "date": "avui",
        "pk": "LR#Milanuncios",
        "name": "Milanuncios"
    },
    {
        "sk": "#DATE#2021-10-15",
        "date": "avui",
        "pk": "LR#Feinaactiva",
        "name": "Feinaactiva"
    },
    {
        "sk": "#DATE#2021-10-14",
        "date": "ahir",
        "pk": "LR#Infofeina",
        "name": "Infofeina"
    },
    {
        "sk": "#DATE#2021-10-14",
        "date": "ahir",
        "pk": "LR#DigitalNomads",
        "name": "DigitalNomads"
    },
    {
        "sk": "#DATE#2021-10-15",
        "date": "avui",
        "pk": "LR#Feinaactiva",
        "name": "Feinaactiva"
    }
];

const botNames = [
    'Milanuncios',
    'Wallapop',
    'Feinaactiva',
    'Infofeina',
    'DigitalNomads'
];

let str
str = APIData.map(e => e.name)
console.log(str);

const newAPIData = []
for (const botName of botNames) {
    for (const bot of APIData) {
        if (botName === bot.name){
            newAPIData.push(bot);
            continue;
        }
    }
}

str = newAPIData.map(e => e.name)
console.log(str);