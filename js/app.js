var rolodex = localStorage.getItem('rolodex'); //load stored data if there is any

window.onload = function() {
	rolodex = JSON.parse(rolodex);
	if(rolodex === null) { //if no data, initialize an empty array
		rolodex = [];
	} else {
	console.log(rolodex);
	}

	var btnSave = document.getElementById('btnSave').addEventListener('click', add, false); 
	var btnSearch = document.getElementById('btnSearch').addEventListener('click', searchKeywords, false);
	var btnReset = document.getElementById('btnReset').addEventListener('click', list, false);
	var btnClearStorage = document.getElementById('btnClearStorage').addEventListener('click', clearStorage, false);

	list();
};

var clearStorage = function() {
	rolodex = [];
	localStorage.clear();
	list();
};

var add = function() { //add an SME with the form
	var SME = {
		firstname:document.getElementById('firstname').value,
		lastname:document.getElementById('lastname').value,
		email:document.getElementById('email').value,
		subject:document.getElementById('subject').value,
		keywords:document.getElementById('subject').value.toLowerCase().split(" "), //create keywords from the subject line
		uid:document.getElementById('firstname').value+document.getElementById('lastname').value+Math.floor(Math.random()*10001) //unique ID for future use

	};

	rolodex.push(SME); //add to the array
	localStorage.setItem('rolodex', JSON.stringify(rolodex)); //string the array and send to localStorage

	var div = document.getElementById('list-display');
	div.innerHTML = div.innerHTML + "<div class=\"sme-entry\" id=\""+SME.uid+"\"><ul class=\"no-list-style\"><li><h3>"+SME.subject+"<h3></li><li>"+SME.firstname+" "+SME.lastname+"</li><li>"+SME.email+"</li></ul><a href=\"javascript:remove(\'"+SME.uid+"\');\" class=\"delete\">X</a></div>";

	document.getElementById('firstname').value = "";
	document.getElementById('lastname').value = "";
	document.getElementById('email').value = "";
	document.getElementById('subject').value = "";
};

var list = function() { //list existing SMEs, used during onLoad
	var div = document.getElementById('list-display');
	div.innerHTML = "";
	for (var key in rolodex) {
		var person = rolodex[key];
		div.innerHTML = div.innerHTML + "<div class=\"sme-entry\" id=\""+person.uid+"\"><ul class=\"no-list-style\"><li><h3>"+person.subject+"</h3></li><li>"+person.firstname+" "+person.lastname+"</li><li>"+person.email+"</li></ul><a href=\"javascript:remove(\'"+person.uid+"\');\" class=\"delete\">X</a></div>";
	}
};

var findByUID = function(uniqueID) { //this function takes an object's uid and finds it in the rolodex array and then returns index of the object containing it in the array
	if(typeof uniqueID === "string") { //make sure you pass a string
		position = rolodex.map(function(e){return e.uid;}).indexOf(uniqueID);
		return position;
	} else {
		console.log("findByUID() only takes strings");
	}
};

var remove = function(uid) { //delete the object in rolodex found at the indexOf based on uid
	if(typeof uid === "string") {
		var index = findByUID(uid);
		var removed = rolodex.splice(index, 1); //removed should return what was spliced out of the rolodex
		localStorage.setItem('rolodex', JSON.stringify(rolodex));
		list(); //re-render the list
	} else {
		console.log("findByUID() only takes strings");
	}
};

var searchKeywords = function() { //currently this is searching by firstname not keyword
	var div = document.getElementById('list-display');
	var search = document.getElementById('search').value;
	var results = rolodex.map(function(e){
		return e.lastname;
	}).indexOf(String(search));
	alert(results);
	if (results >= 0) {
		var obj = rolodex[results];
		div.innerHTML = "<div class=\"sme-entry\" id=\""+obj.uid+"\"><ul class=\"no-list-style\"><li><h3>"+obj.subject+"</h3></li><li>"+obj.firstname+" "+obj.lastname+"</li><li>"+obj.email+"</li></ul><a href=\"javascript:remove(\'"+obj.uid+"\');\" class=\"delete\">X</a></div>";
	} else {
		alert("No results");
	}
};

//Need to get newSearch working to replace the above one...WIP
var newSearch = function() {
	var div = document.getElementById('list-display');
	var keyword = document.getElementById('search').value.toLowerCase();
	var results = function(keyword) {
		for(var key in rolodex) {
			var person = rolodex[key].keywords;
			alert(person.indexOf(keyword) > -1);
		}
	};
//	if (results >= 0) {
//		var obj = rolodex[results];
//		div.innerHTML = "<div class=\"sme-entry\" id=\""+obj.uid+"\"><ul class=\"no-list-style\"><li><h3>"+obj.subject+"</h3></li><li>"+obj.firstname+" "+obj.lastname+"</li><li>"+obj.email+"</li></ul><a href=\"javascript:remove(\'"+obj.uid+"\');\" class=\"delete\">X</a></div>";
//	} else {
//		alert("No results");
//	}
};