let stats = JSON.parse(localStorage.getItem('dailyData'));
let dailyData = [];

document.querySelector("#stats-option").value = "week"
showStats(document.querySelector("#stats-option"));


function saveData(ele) {

  let day = new Date;
  let weightInput = document.querySelector("#weight-input");
  let weekNo = day.getDay();
  let weight = Number(weightInput.value);
  console.log(weight)

  const dataObj = {
    weekNo,
    weight,
  };


  if(localStorage.getItem("dailyData") == null || localStorage.getItem("dailyData" == undefined )) {
    dailyData.push(dataObj);
    localStorage.setItem("dailyData", JSON.stringify(dailyData));
  }
  else{
    let localDailyData = JSON.parse(localStorage.getItem("dailyData")); //array of objects
    let length = localDailyData.length;
    if(localDailyData[length-1].weekNo == weekNo){
      localDailyData[length-1] = dataObj;
      localStorage.setItem("dailyData", JSON.stringify(localDailyData));
    }else{
      localDailyData.push(dataObj);
      localStorage.setItem("dailyData", JSON.stringify(localDailyData));
    }
  }

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
    (stats == null)? alert("nothing to show") : confirm("showing weekly stats");
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
    }else{
      weekNoArr.push(stats[week].weekNo);
      weightArr.push(stats[week].weight);
    }

    week++;

  }

  let labels = [];

  weekNoArr.forEach( ele => {
    if(ele == null){
      labels.push("null");
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
    "line",
    weightData,
    weightOptions
  );

  // > create attendence chart
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

function hideStats(){
  // document.getElementById("sec1").style.display = "none";
  // document.getElementById("sec2").style.display = "none";
  console.log("nothing to show")
}

function createChart(ctx, type, data, options){

    const config = {
      type,
      data,
      options,
    }

  	new Chart(ctx, config);
}