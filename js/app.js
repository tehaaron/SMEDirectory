var rolodex = localStorage.getItem('rolodex'); //load stored data if there is any

window.onload = function() {
	rolodex = JSON.parse(rolodex);
	if(rolodex === null) { //if no data, initialize an empty array
		rolodex = [];
	} else {
	console.log(rolodex);
	}


	var btnSave = document.getElementById('btnSave'); 
	btnSave.addEventListener('click', Add, false); //assign button action

	List();
};

var Add = function() { //add an SME with the form
	var SME = {
		firstname:document.getElementById('firstname').value,
		lastname:document.getElementById('lastname').value,
		email:document.getElementById('email').value,
		subject:document.getElementById('subject').value,
		uid:document.getElementById('firstname').value+document.getElementById('lastname').value+Math.floor(Math.random()*10001) //unique ID for future use

	};

	rolodex.push(SME); //add to the array
	localStorage.setItem('rolodex', JSON.stringify(rolodex)); //string the array and send to localStorage

	var div = document.getElementById('list-display');
	div.innerHTML = div.innerHTML + "<div class='sme-entry' id='"+person.uid+"'><ul class='no-list-style'><li><h3>"+person.subject+"<h3></li><li>"+person.firstname+" "+person.lastname+"</li><li>"+person.email+"</li></ul><div class='delete'>X</div></div>";

	alert("Saved"); //alert if it submitted..for testing
};

var List = function() { //list existing SMEs, used during onLoad
	for (var key in rolodex) {
		var person = rolodex[key];
		var div = document.getElementById('list-display');
		div.innerHTML = div.innerHTML + "<div class='sme-entry' id='"+person.uid+"'><ul class='no-list-style'><li><h3>"+person.subject+"</h3></li><li>"+person.firstname+" "+person.lastname+"</li><li>"+person.email+"</li></ul><div class='delete'>X</div></div>";
	}
};

var findByUID = function(uniqueID) { //this function takes an object's uid and finds it in the rolodex array and then returns index of the object containing it in the array
	if(typeof uniqueID === "string") { //make sure you pass a string
		position = rolodex.map(function(e){return e.uid}).indexOf(uniqueID);
		return position;
	} else {
		console.log("findByUID() only takes strings");
	}
};

var Delete = function(uid) { //delete the object in rolodex found at the indexOf 
	if(typeof uid === "string") {
		var index = findByUID(uid);
		rolodex.splice(index, 1);
	} else {
		console.log("findByUID() only takes strings");
	}
};