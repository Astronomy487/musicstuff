let lang = navigator.language;
let cells = document.querySelector("tr").querySelectorAll("td");
let dateString = document.querySelector("meta[property=\"music:release_date\"]").getAttribute("content");
cells[0].innerText = new Intl.DateTimeFormat(lang || "en", {month: "short", day: "numeric", year: "numeric"}).format(new Date(dateString.substring(0, 4), dateString.substring(5, 7)-1, dateString.substring(8, 10)));
let shortLanguage = (lang.includes("-")) ? lang.substring(0, lang.indexOf("-")) : lang;
if (cells.length == 3) cells[1].innerText = new Intl.NumberFormat(lang).format(parseInt(cells[1].innerText)) + ({
	en: " tracks", es: " pistas", de: " Titel", ja: "曲", fr: " titres",
	pt: " faixas", ru: " треков", it: " brani", nl: " nummers", pl: " utworów",
	tr: " parça", fa: " قطعه", zh: "曲目", vi: " ca khúc", id: " lagu",
	cs: " skladeb", ko: "곡", uk: " треків", hu: " dal", sv: " spår",
	ar: " مسارات", ro: " piese", el: " κομμάτια", he: " שירים", da: " numre",
	fi: " kappaletta", th: " แทร็ก", nb: " spor", ms: " lagu", hi: " ट्रैक्स",
	bn: " ট্র্যাক", ur: " ٹریکس", eo: " kantoj"
}[shortLanguage]||" tracks");
let duration = parseInt(document.querySelector("meta[property=\"music:duration\"]").getAttribute("content"));
cells[cells.length-1].innerText = new Intl.DurationFormat(lang || "en", {style: "narrow"}).format({hours: Math.floor(duration/3600), minutes: Math.floor(duration/60)%60, seconds: duration%60});
if ({ar: true, he: true, ur: true}[shortLanguage]) document.querySelector("tr").setAttribute("dir", "rtl");