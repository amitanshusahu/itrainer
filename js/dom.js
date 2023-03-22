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

let present = 0;
for(key in isPresent){
	if (isPresent[key]) {
		present++
	}
}
let absent = 6 - present;
const attendenceCanvas = document.getElementById('attendence');
const attendenceData = {
labels: [
'Present',
'Days Left / absent',
],
datasets: [{
  data: [present, absent],
  backgroundColor: [
    'rgb(99, 250, 132)',
    'rgb(255, 99, 132)',
    ],
  }]
};
const attendenceOptions = {
    plugins: {
        legend: {
            display: false,
        }
    }
}
createChart(
attendenceCanvas,
"pie",
attendenceData,
attendenceOptions
);
if(present == 6 && diciplinePoints.isWeekCompleted){
	diciplinePoints.isWeekCompleted = false;
	diciplinePoints.count += 1;
	localStorage.setItem('diciplinePoints', JSON.stringify(diciplinePoints));
}
if(present == 1){
	diciplinePoints.isWeekCompleted = true;
	localStorage.setItem('diciplinePoints', JSON.stringify(diciplinePoints));
}

document.querySelector('#steak span').innerText = steak.count;

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

if(localStorage.getItem("updateTarget1") == 'true') {

	let targets = document.querySelectorAll(".exname");
	let list = document.querySelectorAll(".scedule .list");
	let checkBox = document.querySelector("#target1-btn");
	list[0].style = "text-decoration: line-through;";
	targets[0].style = "text-decoration: line-through;";
	checkBox.checked = true;

}
if(localStorage.getItem("updateTarget2") == 'true') {

	let targets = document.querySelectorAll(".exname");
	let list = document.querySelectorAll(".scedule .list");
	let checkBox = document.querySelector("#target2-btn");
	list[1].style = "text-decoration: line-through;";
	targets[1].style = "text-decoration: line-through;";
	checkBox.checked = true;

}

function updateTarget1(ele){

	if(ele.checked == true){
		let targets = document.querySelectorAll(".exname");
		let target1 = targets[0].innerText.toLocaleLowerCase();

		if(localStorage.getItem("updateTarget1") == 'false') {
			targetStats[target1] += 1;
			localStorage.setItem("targetStats", JSON.stringify(targetStats));
			sessionStorage.setItem("targetStats", JSON.stringify(targetStats));
			localStorage.setItem('updateTarget1', 'true');
			if(steak.preOnline != preDay){
				if(steak.preOnline != 'saturday' && today != 'monday'){
					steak.count = 0;
					localStorage.setItem('steak' , JSON.stringify(steak));
					document.querySelector('#steak span').innerText = steak.count;
				}
			}
			if(steak.shouldIncrease){
				steak.count += 1;
				steak.shouldIncrease = false;
				steak.preOnline = today;
				localStorage.setItem('steak' , JSON.stringify(steak));
				document.querySelector('#steak span').innerText = steak.count;
			}
			if(today == 'monday'){
				isPresent =  {
				monday : false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false,
				};
				localStorage.setItem('isPresent', JSON.stringify(isPresent));
			}
			for(key in isPresent){
				if(today == key){
					isPresent[key] = true;
				}
			}
			localStorage.setItem('isPresent', JSON.stringify(isPresent));
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