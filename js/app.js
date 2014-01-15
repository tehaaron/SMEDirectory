var rolodex = localStorage.getItem('rolodex'); //load stored data if there is any

window.onload = function() {
	rolodex = JSON.parse(rolodex);
	if(rolodex === null) { //if no data, initialize an empty array
		rolodex = [];
	} else {
	console.log(rolodex);
	}


	var btnSave = document.getElementById('btnSave');
	btnSave.addEventListener('click', add, false);


};

var add = function(){
	var SME = JSON.stringify({
		firstname:document.getElementById('firstname').value,
		lastname:document.getElementById('lastname').value,
		email:document.getElementById('email').value,
		subject:document.getElementById('subject').value
	});

	rolodex.push(SME);
	localStorage.setItem('rolodex', JSON.stringify(rolodex));
	alert("Saved");
};

