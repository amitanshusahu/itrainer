document.querySelector(".scedule .toggle h1").innerText = today;

if(saved != null && saved == "true") {
  let saveBtn = document.querySelector(".scedule .toggle button");
  saveBtn.style.color = "white";
  saveBtn.innerText = "Saved"
};

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

document.querySelector("#stats-option").value = "week"
showStats(document.querySelector("#stats-option"));

function saveData(ele) {

  let day = new Date;
  let weightInput = document.querySelector("#weight input");
  let timeInput = document.querySelector("#time input");
  // let weekNo = day.getDay();
  let weekNo = 1;
  let weight = Number(weightInput.value);
  let time = Number(timeInput.value);

  const dataObj = {
    weekNo,
    weight,
    time,
  };


  if(localStorage.getItem("dailyData") == null || localStorage.getItem("dailyData" == undefined )) {
    dailyData.push(dataObj);
    localStorage.setItem("dailyData", JSON.stringify(dailyData));
    localStorage.setItem("saved", "true");
    ele.style.color = "white";
    ele.innerText = "Saved";
  }
  else{
    let localDailyData = JSON.parse(localStorage.getItem("dailyData")); //array of objects
    let length = localDailyData.length;
    if(localDailyData[length-1].weekNo == weekNo){
      localDailyData[length-1] = dataObj;
      localStorage.setItem("dailyData", JSON.stringify(localDailyData));
      localStorage.setItem("saved", "true");
      ele.style.color = "white";
      ele.innerText = "Saved";
    }else{
      localDailyData.push(dataObj);
      localStorage.setItem("dailyData", JSON.stringify(localDailyData));
      localStorage.setItem("saved", "true");
      ele.style.color = "white";
      ele.innerText = "Saved";
    }
  }

}

function dailyInputChange() {

  localStorage.setItem("saved", "false");
  let saveBtn = document.querySelector(".scedule .toggle button");
  saveBtn.style.color = "black";
  saveBtn.innerText = "Save"

}

function showStats(ele) {

  let selected = ele.value;
  switch(selected){
    case "week": 
      showWeeklyStats()
      break
    case "month": 
      showMonthlyStats()
      break
    case "year": 
      showYearlyStats()
      break
    case "all": 
      showAllStats()
      break
  }

}

function showWeeklyStats() {

  if(stats == null){
    stats = JSON.parse(localStorage.getItem('dailyData'));
    (stats == null)? alert("Nothing to show in stats, enter your weight") : confirm("showing weekly stats");
  }

  let weekNoArr = [];
  let weightArr = [];
  let timeArr = [];

  let length = stats.length;
  let week = length - 7;
  while(week != length) {

    if(stats[week] == undefined){
      weekNoArr.push(null);
      weightArr.push(0);
      timeArr.push(0);
    }else{
      weekNoArr.push(stats[week].weekNo);
      weightArr.push(stats[week].weight);
      timeArr.push(stats[week].time);
    }

    week++;

  }

  let labels = [];

  weekNoArr.forEach( ele => {
    if(ele == null){
      labels.push("absent");
    }
    else{
      labels.push(getWeekName(ele));
    }
  })

  createWeeklyCharts(labels, weightArr, timeArr);

}

function showMonthlyStats() {

  alert("feature under development")

}

function showYearlyStats() {

  alert("feature under development")

}

function showAllStats() {

  alert("feature under development");

}

function createWeeklyCharts(labels, weightArr, timeArr) {

  //> create track weight chart
  const weightCanvas = document.getElementById('track-weight'); 
  const weightData= {
    labels,
    datasets: [{
      label: 'Body Weight',
      data: weightArr,
      borderWidth: 1,
    }]
  };
 const  weightOptions = {
      plugins: {
        legend: {
            display: false,
        }
      }
  };
  createChart(
    weightCanvas,
    "bar",
    weightData,
    weightOptions
  );

  //> create tract time chart
  const timeCanvas = document.getElementById('track-time'); 
  const timeData= {
    labels,
    datasets: [{
      label: 'Time Spent',
      data: timeArr,
      borderWidth: 1,
    }]
  };
 const  timeOptions = {
      plugins: {
        legend: {
            display: false,
        }
      }
  };
  createChart(
    timeCanvas,
    "bar",
    timeData,
    timeOptions
  );

  //> create attendence chart
  let present = 0;
  let absent = 0;
  labels.forEach( ele =>{
    if(ele == "absent"){
      absent++;
    }else{
      present++;
    }
  })
  const attendenceCanvas = document.getElementById('attendence');
  const attendenceData = {
    labels: [
    'Present',
    'Absent',
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

}
