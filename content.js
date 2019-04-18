
function injectFunction(id, pillage) {
	console.log("injectFunction");
	var actualCode = `
	Travian.Game.RaidList.addSlot(` + id +  `,'','','rallyPoint');
	setTimeout(function(){
		Travian.Game.RaidList.saveSlot(` + id +  `, null, JSON.parse('` + pillage +  `'), false);
		setTimeout(function(){
			document.location.reload(true);
		}, 2000);
	}, 1000);
	`;
	console.log(actualCode);
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

function createPillage(pillage, coord) {
    pillage.x = coord.x + "";
    pillage.y = coord.y + "";
		console.log(coord);
	return pillage;
}





function addIt() {
	console.log('add it');
	var originalPillage;
	var idList;
	var listPillage = [];
		chrome.storage.sync.get("pillage", function(result){
    if (result.pillage) {
    	originalPillage = JSON.parse(result.pillage);
			console.log(originalPillage);
    	chrome.storage.sync.get("list", function(result){
        if (result.list) {
			listPillage = JSON.parse(result.list);
        	if (listPillage.length > 0) {
				var pillage = listPillage[0];
				console.log(pillage);
				listPillage.shift();
				chrome.storage.sync.set({"list":  JSON.stringify(listPillage)});
				injectFunction(originalPillage.lid, JSON.stringify(createPillage(originalPillage, pillage)));
			}
		}
	});
    }
});

}

window.addEventListener ("load", myMain, false);

function myMain (evt) {
	console.log("mymain");
           addIt();
}
