for (let a of document.querySelectorAll("a")) {
	let img = a.querySelector("img");
	let src = img.src;
	src = src.replace("file:///C:/Users/astro/Code/astronomy487.github.io/", "https://www.astronomy487.com/");
	
	/* behavior = [icon mode on hover, icon mode on non-hover] */
	let behavior = {
		"mode-dark": [
			["spotify", "amazonmusic"].includes(a.className) ? "/black/" : "/white/",
			"/colors/"
		],
		"mode-black": [
			"/colors/", "/black/"
		],
		"mode-light": [
			["spotify", "amazonmusic"].includes(a.className) ? "/black/" : "/white/",
			"/colors/"
		]
	}[document.body.className];
	
	a.onmouseenter = function() {
		img.src = src.replace("/colors/", behavior[0]);
	}
	a.onmouseleave = function() {
		img.src = src.replace("/colors/", behavior[1]);
	}
	new Image().src = src.replace("/colors/", behavior[0]); //preload image for hover
	a.onmouseleave();
}