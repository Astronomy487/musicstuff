let lang = navigator.language;
let cells = document.querySelector("tr").querySelectorAll("td");
let dateString = document.querySelector("meta[property=\"music:release_date\"]").getAttribute("content");
cells[0].innerText = new Intl.DateTimeFormat(lang || "en", {month: "short", day: "numeric", year: "numeric"}).format(new Date(dateString.substring(0, 4), dateString.substring(5, 7)-1, dateString.substring(8, 10)));
let shortLanguage = (lang.includes("-")) ? lang.substring(0, lang.indexOf("-")) : lang;
if (cells.length == 3) cells[1].innerText = ({
	en: "#n tracks", es: "#n pistas", de: "#n Titel", ja: "#n曲", fr: "#n titres",
	pt: "#n faixas", ru: "#n треков", it: "#n brani", nl: "#n nummers", pl: "#n utworów",
	tr: "#n parça", zh: "#n曲目", vi: "#n ca khúc", id: "#n lagu",
	cs: "#n skladeb", ko: "#n곡", uk: "#n треків", hu: "#n dal", sv: "#n spår",
	ro: "#n piese", el: "#n κομμάτια", da: "#n numre",
	ar: "#n مسارات", he: "#n שירים", fa: "#n قطعات", ur: "#n ٹریکز",
	fi: "#n kappaletta", th: "#n แทร็ก", nb: "#n spor", ms: "#n lagu", hi: "#n ट्रैक्स",
	bn: "#n ট্র্যাক", eo: "#n kantoj", jbo: "#n selsa'a", tok: "#n kalama musi"
}[shortLanguage]||" tracks").replace("#n", new Intl.NumberFormat(lang).format(parseInt(cells[1].innerText)));
let duration = parseInt(document.querySelector("meta[property=\"music:duration\"]").getAttribute("content"));
cells[cells.length-1].innerText = new Intl.DurationFormat(lang || "en", {style: "narrow"}).format({hours: Math.floor(duration/3600), minutes: Math.floor(duration/60)%60, seconds: duration%60});
if ({ar: true, he: true, ur: true}[shortLanguage]) document.querySelector("tr").setAttribute("dir", "rtl");