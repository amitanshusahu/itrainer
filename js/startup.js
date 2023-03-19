const scedule = {

	monday: {
		back: 	[["barbel rowing (straight)", "barbel rowing (reverse)"],
				["pull down (wide front)", "pull down (wide back)"],
				"cable rowing (V hold)",
				"pull over ( concentration )"],
		bicep: 	[["ficher (dumbell)", "ficher (machine)"],
				["dumbell curl (stand)", "dumbell curl (bench)", "dumbell curl (arm blaster)"],
				["dumbell hammer (stand)", "dumbell hammer (bend)", "dumbell hammer (arm blaster)"],
				"bicep (concentration)"],

	},

	tuesday: {
		chest: 	[["barbell bench press (incline)", "barbell bench press (flat)", "barbell bench press (decline)"],
				["dumbell bench press (flat)", "dumbell bench press (incline flat)"],
				"butterfly fly machine",
				["cable fly (incline)", "cable fly (decline)"]],
		tricep: ["tricep cable",
				["double arm extention (barbell)", "double arm extention (dumbell)"],
				"dumbell skull crusher",
				"tricep dips (concentration)"],
	},

	wednesday: {
		shoulder: ["shoulder press machine",
				  ["shoulder press (dumbell)", "shoulder press (barbell back)", "shoulder presss (barbell front)"],
				  "arnold shoulder",
				  ["front raise (dumbe ll)", "front raise (barbell)"],
				  "side raise (dumbell)",
				  "bend fly (dumbell)",
				  ["rowing (dumbell)", "rowing (barbell)"]],
		trap: ["shurgs (dumbell)", "shurgs (barbell)"],
	},

	thursday: {
		back: [["smith rowing", "dumbell rowing"],
			   ["pull down (wide hold)", "pull down (mid hold)"],
			   ["bar rowing (close)", "bar rowing (wide)"],
			   ["cable rowing (wide hold)", "cable rowing (midhold)"]],
		bicep: [["bicep cable rowing (stright bar)"],
				"box hammer",
				["straight rod curl", "box curl", "snake rod curl"],
				"bicep (concentration)"],
	},

	friday: {
		chest: [["barbell bench press (decline)", "barbell bench press (decline)", "barbell bench press (incline)"],
			["dumbell bench press (flat)", "dumbell bench press (flat)", "dumbell bench press (incline)"],
			"dumbell fly (flat)",
			"close grip (concentration)",
			["dumbell fly (incline)", "dumbell fly (decline)"]],
		tricep: ["tricep cable", "single arm extention", "barbell skull crusher"]
	},

	saturday: {
		leg: ["langues", "sumo lift", "leg press",
			["squad (barbell)", "squad (dumbell)"],
			["leg extention (back)", "leg extention (front)"],
			"waist",
			"calf muscle (smith)"]
	},
};




/// ---- GLOBAL VARIABLES / CONSTANTS---- 

let dailyData = [];
let stats = JSON.parse(localStorage.getItem('dailyData'));
let todaysExSchedule = [];
let saved = localStorage.getItem("saved");

const preOnline = localStorage.getItem("preOnline");
let preWeek = getWeekName(getWeekNo() - 1);
const today = getTodaysDay();



/// ------------- LOGIC --------------

if(today == "sunday"){
  todaysExObj = {
    rest: ["take enough rest"]
  }
}
else{
  const todaysExObj = scedule[today];
}

if(preOnline == preWeek){
	localStorage.setItem("saved", "false");
}

//> run showTodaysExercise once
if(preOnline !== today) {

	todaysExSchedule = showTodaysExercise(todaysExObj);
	localStorage.setItem (
		"todaysExSchedule",
	 	JSON.stringify(todaysExSchedule)
	 	);

}
else {

	todaysExSchedule = JSON.parse(
		localStorage.getItem("todaysExSchedule")
		);

}

//> save previous online as today, so that showTodaysExercise only runs once a day
localStorage.setItem("preOnline", today);




/// -------- ABSTRACT FUNCTIONS --------

//? returns today's week day
function getTodaysDay() {

	let date = new Date;
	const weekNo = date.getDay();
	let day = getWeekName(weekNo);

	return day;

}

function getWeekName(weekNo) {

  let weekName;
	switch(weekNo) {
		case 0: 
			weekName= "sunday"
			break
		case 1: 
			weekName= "monday"
			break
		case 2: 
			weekName= "tuesday"
			break
		case 3: 
			weekName= "wednesday"
			break
		case 4: 
			weekName= "thursday"
			break
		case 5: 
			weekName= "friday"
			break
		case 6: 
			weekName= "saturday"
			break
	}
  return weekName;

}

function getWeekNo(weekName){
	let weekNo;
	if(weekName == null || weekName == undefined){
		let day = new Date;
		weekNo = day.getDay();
	}
	else{
		switch(weekName) {
			case "sunday": 
				weekNo= 0
				break
			case "monday": 
				weekNo= 1
				break
			case "tuesday": 
				weekNo= 2
				break
			case "wednesday": 
				weekNo= 3
				break
			case "thursday": 
				weekNo= 4
				break
			case "friday": 
				weekNo= 5
				break
			case "saturday": 
				weekNo= 6
				break
		}
	}
	return weekNo;
}


//? showTodaysExercise(exObj | object)
function showTodaysExercise(exObj) {

	let keys = Object.keys(exObj); //array
	let length = keys.length;
	for (let i = 0; i < length; i++) {
		todaysExSchedule[i] = getExArray(exObj[`${keys[i]}`]);
	}
	return todaysExSchedule; // Array of Arrays

}


function getExArray(exArr) {

	let arr = [];

	exArr.forEach( ex => {
		if(typeof(ex) != "string"){
			arr.push(getVariations(ex));
		}else{
			arr.push(ex);
		}
	})

	return arr; // Array

}


function getVariations(varArr) {

	let length = varArr.length;
	let rep = checkStorage( varArr[0], length);
	return varArr[rep];

}


function checkStorage(string, length) {

	if(localStorage.getItem(string) != null || localStorage.getItem(string) != undefined){
		let rep = Number(localStorage.getItem(string));

		let repInc = rep + 1;
		localStorage.setItem(string, `${repInc}`);

		if(rep >= length){ 
			rep = 0;
			localStorage.setItem(string, 1);
		}

		return rep;
	}else{
		localStorage.setItem(string, 1);
		return 0;
	}

}

function createChart(ctx, type, data, options){

    const config = {
      type,
      data,
      options,
    }

  	new Chart(ctx, config);
}
