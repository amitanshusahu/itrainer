let sceduleBox = document.querySelector(".target");
let sceduleList = sceduleBox.querySelectorAll(".list");
let targetName = sceduleBox.querySelectorAll(".exname");

let targets = Object.keys(todaysExObj);
let length = todaysExSchedule.length;

for(let i = 0; i < length; i++) {

	targetName[i].innerText = targets[i];

	for(let j = 0; j < todaysExSchedule[i].length; j++){

		sceduleList[i].innerHTML += `<li> ${todaysExSchedule[i][j]} </li>`

	}

}

let targetStats = JSON.parse(localStorage.getItem("targetStats")) || {
	back:0,
	bicep:0,
	tricep:0,
	chest:0,
	shoulder:0,
	trap:0,
	leg:0,
	abs:0
};

console.log(targetStats);
function updateTarget1(ele){

	if(ele.checked == true){
		let targets = document.querySelectorAll(".exname");
		let target1 = targets[0].innerText.toLocaleLowerCase();

		if(localStorage.getItem("updateTarget1") == 'false') {
			targetStats[target1] += 1;
			localStorage.setItem("targetStats", JSON.stringify(targetStats));
			sessionStorage.setItem("targetStats", JSON.stringify(targetStats));
			localStorage.setItem('updateTarget1', 'true');
		}

		// --- dom effects --
		let list = document.querySelectorAll(".scedule .list");
		list[0].style = "text-decoration: line-through;"
		targets[0].style = "text-decoration: line-through;"
	}

}

function updateTarget2(ele){

	if(ele.checked == true){
		let targets = document.querySelectorAll(".exname");
		let target2 = targets[1].innerText.toLocaleLowerCase();

		if(localStorage.getItem("updateTarget2") == 'false') {
			targetStats[target2] += 1;
			localStorage.setItem("targetStats", JSON.stringify(targetStats));
			sessionStorage.setItem("targetStats", JSON.stringify(targetStats));
			localStorage.setItem('updateTarget2', 'true');
		}

		// --- dom effects --
		let list = document.querySelectorAll(".scedule .list");
		list[1].style = "text-decoration: line-through;"
		targets[1].style = "text-decoration: line-through;"
	}


}