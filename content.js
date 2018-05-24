
function injectFunction(id, pillage) {
	var actualCode = `
	Travian.Game.RaidList.addSlot(` + id +  `,'','','rallyPoint');
	setTimeout(function(){ 
	Travian.Game.RaidList.saveSlot(` + id +  `, JSON.parse('` + pillage +  `'), true, null ); }
	, 1000);
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

	return pillage;
}





function addIt() {
	var originalPillage;
	var idList;
var listPillage = [];
		chrome.storage.sync.get("pillage", function(result){
    if (result.pillage) {
    	originalPillage = JSON.parse(result.pillage);
    	chrome.storage.sync.get("list", function(result){
        if (result.list) {
			listPillage = JSON.parse(result.list);
        	if (listPillage.length > 0) {
				var pillage = listPillage[0];
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
           addIt();
}