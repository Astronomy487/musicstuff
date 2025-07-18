let cells = document.querySelector("tr").querySelectorAll("td");
cells[0].innerText = Talktalk.talk(new Date(document.querySelector("meta[property=\"music:release_date\"]").getAttribute("content").replaceAll("-","/")));
if (cells.length == 3) cells[1].innerText = Talktalk.talk("trackcount", {n:parseInt(cells[1].innerText)});
cells[cells.length-1].innerText = Talktalk.duration(parseInt(document.querySelector("meta[property=\"music:duration\"]").getAttribute("content"))).talk();