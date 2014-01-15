var rolodex = localStorage.getItem('rolodex'); //load stored data if there is any

window.onload = function() {
	rolodex = JSON.parse(rolodex);
	if(rolodex === null) { //if no data, initialize an empty array
		rolodex = [];
	} else {
	console.log(rolodex);
	}


	var btnSave = document.getElementById('btnSave');
	btnSave.addEventListener('click', Add, false);

	List();
};

var Add = function(){
	var SME = JSON.stringify({
		firstname:document.getElementById('firstname').value,
		lastname:document.getElementById('lastname').value,
		email:document.getElementById('email').value,
		subject:document.getElementById('subject').value
	});

	rolodex.push(SME);
	localStorage.setItem('rolodex', JSON.stringify(rolodex));

	for (var key in SME) {
		var person = JSON.parse(SME[key]);
		var div = document.getElementById('list-display').lastChild;
		div.innerHTML = div.innerHTML + "<div class='sme-entry'><ul><li>"+person.subject+"</li><li>"+person.firstname+" "+person.lastname+"</li><li>"+person.email+"</li></ul></div>";
	}

	alert("Saved");
};

var List = function(){
	for (var key in rolodex) {
		var person = JSON.parse(rolodex[key]);
		var div = document.getElementById('list-display');
		div.innerHTML = div.innerHTML + "<div class='sme-entry'><ul><li>"+person.subject+"</li><li>"+person.firstname+" "+person.lastname+"</li><li>"+person.email+"</li></ul></div>";
	}
};