var pillageList = [];

function createList(lstVillage) {
  pillageList = [];

  for (var i = 0; i  < lstVillage.length; i++) {
    var pillage = {};

    pillage.x = lstVillage[i].split('|')[0] + "";
    pillage.y = lstVillage[i].split('|')[1] + "";

    pillageList.push(pillage);
  }
  console.log(pillageList);
  chrome.storage.sync.set({"list":  JSON.stringify(pillageList)});
}

document.addEventListener('DOMContentLoaded', function() {

  /////// BUTTON SAVE
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    if (document.getElementById('listid').value != "") {
      chrome.storage.sync.set({"idList":  document.getElementById('listid').value});
    }
    if (document.getElementById('pillage').value != "") {
      chrome.storage.sync.set({"list":  document.getElementById('pillage').value});
    }
    var pillage = {};

    pillage.lid = "" + document.getElementById('listid').value;
    pillage.t1 = "" + document.getElementById('t1').value;
    pillage.t2 = "" + document.getElementById('t2').value;
    pillage.t3 = "" + document.getElementById('t3').value;
    pillage.t4 = "" + document.getElementById('t4').value;
    pillage.t5 = "" + document.getElementById('t5').value;
    pillage.t6 = "" + document.getElementById('t6').value;
    pillage.t7 = "" + document.getElementById('t7').value;
    pillage.t8 = "" + document.getElementById('t8').value;
    pillage.t9 = "" + document.getElementById('t9').value;

    chrome.storage.sync.set({"pillage":  JSON.stringify(pillage)});
    
  }, false);

  /////// BUTTON CREATE LIST
  var getList = document.getElementById('getList');
  getList.addEventListener('click', function() {
    console.log('getlist');
    var codeJS = `
    (function getListPillage() {
      var lstPillage=[];
      var lst = document.getElementsByClassName('orangeTable')[0].getElementsByClassName('koord');
      for (var i = 0; i< lst.length; i++) {
        lstPillage.push(lst[i].innerText.replace('(', '').replace(')', '').replace(/ /g, ''));
      }
      return lstPillage;
    })()
    `;
    chrome.tabs.executeScript( null, 
                              {code:codeJS},
            function(results){
              if (results[0].length > 0) {
                createList(results[0]);
              } 
            } 
    );
    
  }, false);

var clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function() {
    console.log('getlist');
    chrome.storage.sync.set({"list":  JSON.stringify([])});    
  }, false);

  /////// BUTTON CREATE LIST INACTIVE SEARCH
  var getList = document.getElementById('getList2');
  getList.addEventListener('click', function() {
    console.log('getlist');
    var codeJS = `
    (function getListPillage() {
      var lstPillage=[];
      var lst = document.querySelectorAll('.table-inactives tbody tr small');
      for (var i = 0; i< lst.length; i++) {
        lstPillage.push(lst[i].innerText.replace('(', '').replace(')', '').replace(/ /g, ''));
      }
      return lstPillage;
    })()
    `;
    chrome.tabs.executeScript( null, 
                              {code:codeJS},
            function(results){
              if (results[0].length > 0) {
                createList(results[0]);
              } 
            } 
    );
    
  }, false);

}, false);

