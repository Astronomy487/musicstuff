/*

this javascript was removed from the index.html (for desktop)
i didn't like it

*/

doHistogram(["normal", "bonus", "remix"]);
function doHistogram(acceptedCategories) {
	while (histogram.firstChild) histogram.firstChild.remove();
	let historyBuckets = {
		bonus: {},
		normal: {},
		remix: {}
	};
	function considerForHistory(song, date, category) {
		if (!acceptedCategories.includes(category)) return;
		let bucket = date.substring(0, 7);
		if (!(bucket in historyBuckets[category])) historyBuckets[category][bucket] = 0;
		historyBuckets[category][bucket] += song.length;
	}
	for (let album of discog.albums) {
		for (let song of album.songs) considerForHistory(song, song.released || album.released, song.bonus ? "bonus" : "normal");
	}
	for (let remix of discog.remixes) considerForHistory(remix, remix.released, "remix");
	let keys = Object.keys(historyBuckets.bonus).concat(Object.keys(historyBuckets.normal)).concat(Object.keys(historyBuckets.remix)).sort().filter((v,i,a)=>a.indexOf(v)==i);
	let firstYear = parseInt(keys[0].substring(0, 4));
	let lastYear = parseInt(keys[keys.length-1].substring(0, 4));
	let firstMonth = parseInt(keys[0].substring(5));
	let lastMonth = parseInt(keys[keys.length-1].substring(5));
	let n = (lastYear-firstYear-1)*12 + lastMonth + 13 - firstMonth;
	let allotForYAxis = 4;
	n += allotForYAxis;
	let i = 0;
	let maxAmt = keys.map(k => (historyBuckets.bonus[k]||0) + (historyBuckets.normal[k]||0) + (historyBuckets.remix[k]||0)).reduce((a,b)=>Math.max(a,b));
	for (let dur = 0; dur <= maxAmt; dur += 60*30) {
		let label = histogram.appendChild(document.createElement("div"));
		label.style.position = "absolute";
		label.style.left = "0";
		label.style.bottom = dur/maxAmt*24-0.5+"rem";
		label.innerText = dur/(60*60) + "h";
		let hr = histogram.appendChild(document.createElement("hr"));
		hr.style.position = "absolute";
		hr.style.left = allotForYAxis*64/n + "rem";
		hr.style.bottom = dur/maxAmt*24-0.5+"rem";
		hr.style.border = "none";
		hr.style.height = "1px";
		hr.style.background = "#555";
		hr.style.width = (n-4)/n*64+"rem";
	}
	for (let year = firstYear; year <= lastYear; year++) {
		if (year != firstYear) {
			let yearLabel = histogram.appendChild(document.createElement("div"));
			yearLabel.style.left = ((i+allotForYAxis)*64/n) + "rem";
			yearLabel.style.width = (12*64/n) + "rem";
			yearLabel.style.borderLeft = "solid 1px white";
			yearLabel.style.paddingLeft = "0.25rem";
			yearLabel.style.bottom = "-2rem";
			yearLabel.style.position = "absolute";
			if (year != lastYear || lastMonth > 4) yearLabel.innerText = year;
			else yearLabel.innerHTML = "&nbsp;";
		}
		for (let month = ((year==firstYear)?firstMonth:1); month <= ((year==lastYear)?lastMonth:12); month++) {
			let bucket = year+"-"+month.toString().padStart(2, "0");
			let amounts = ["normal", "bonus", "remix"].map(x => historyBuckets[x][bucket] || 0);
			for (let a = 0; a < 3; a++) {
				let bar = histogram.appendChild(document.createElement("div"));
				bar.style.width = 64/n + "rem";
				bar.style.left = (i+allotForYAxis) * 64 / n + "rem";
				bar.style.bottom = amounts.slice(0,a).reduce((x,y)=>x+y,0) / maxAmt*24 + "rem";
				bar.style.height = amounts[a]/maxAmt*24+"rem";
				bar.style.position = "absolute";
				bar.style.background = rhombusColors[a];
				bar.title = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[month-1] + " " + year + " - " + Math.round(amounts[a]/60)+ " minutes of " + ["original music", "bonus tracks", "remixes"][a];
			}
			let label = histogram.appendChild(document.createElement("div"));
			label.style.width = (64/n)+"rem";
			label.style.left = ((i+allotForYAxis)*64/n)+"rem";
			label.style.bottom = "-1rem";
			label.style.position = "absolute";
			label.innerText = "JFMAMJJASOND"[month-1];
			label.style.fontSize = "0.5rem";
			label.style.textAlign = "center";
			i++;
			//check if album released this month
			for (let album of discog.albums.filter(x => x.released.substring(0, 7) == bucket)) {
				let img = histogram.appendChild(document.createElement("img"));
				img.src = album.artwork.replace("_10", "_3");
				img.style.position = "absolute";
				img.style.left = ((i-0.5+allotForYAxis)*64/n)+"rem";
				img.style.transform = "translateX(-50%)";
				img.style.width = img.style.height = "2rem";
				img.style.bottom = "-5rem";
			}
		}
	}
	let legend = histogram.appendChild(document.createElement("div"));
	legend.style.position = "absolute";
	legend.style.bottom = "-7.5rem";
	for (let category of acceptedCategories) {
		let color = legend.appendChild(document.createElement("span"));
		color.innerHTML = "&nbsp;"
		color.style.userSelect = "none";
		color.style.width = "1.5rem";
		color.style.display = "inline-block";
		color.style.background = rhombusColors[["normal", "bonus", "remix"].indexOf(category)];
		let label = legend.appendChild(document.createElement("span"));
		label.innerText = ["Main tracks", "Bonus tracks", "Remixes"][["normal", "bonus", "remix"].indexOf(category)];
		label.style.marginLeft = "0.375rem";
		label.style.marginRight = "2rem";
	}
}