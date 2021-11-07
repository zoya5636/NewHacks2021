//coding file
/*let button = document.createElement("button");
button.innerHTML = "Hello";
document.body.appendChild(button);*/
let currentCourse;
let arr = [];

let backBtn = document.createElement("button");
backBtn.onclick = mainClicked;
createSpecificBtn(backBtn, "Go back to main");

let deleteBtn = document.createElement("button");
deleteBtn.onclick = deleteCourse;
createSpecificBtn(deleteBtn, "Delete Course");

let addAssignBtn = document.createElement("button");
addAssignBtn.onclick = addAssignment;
createSpecificBtn(addAssignBtn, "Add Assignment");

let deleteAssignBtn = document.createElement("button");
deleteAssignBtn.onclick = deleteAssignment;
createSpecificBtn(deleteAssignBtn, "Delete Assignment");

let compBtn = document.createElement("button");
createSpecificBtn(compBtn, "Completed An Assignment");
compBtn.onclick = completedAssign;

let neededBtn = document.createElement("button");
createSpecificBtn(neededBtn, "Calculate Required Mark to Attain Certain Course Average");
neededBtn.onclick = calculateNeededAssignmentMark;

let hypoBtn = document.createElement("button");
createSpecificBtn(hypoBtn, "Calculate Hypothetical Mark");
hypoBtn.onclick = calculateHypotheticalMark;

let backPage = document.createElement("button");
document.body.appendChild(backPage);
backPage.innerHTML = "Back";
backPage.className = "mainButtons";
backPage.style.visibility = "hidden";

class Course {
  btnIndex;
  name;
  assignmentArr = [];
  constructor(name) {
    this.name = name;
  }
}

function deleteAssignment() {
  let assign = window.prompt("Which assignment would you like to delete?: ");
  let index = getObjIndex(assign, currentCourse.assignmentArr);
  if (index == -1) {
    alert("Assignment not found.");
    return;
  }
  (currentCourse.assignmentArr).splice(index, 1);
}

function addAssignment() {
  let assignment;
  let name = window.prompt("Name of Assignment: ");
  let index = getObjIndex(name, currentCourse.assignmentArr);
  if (index != -1) {
    alert("Assignment already exists.");
    return;
  }
  let weight = window.prompt("Weighting of assignment (enter decimal): ");
  let deadline_day = window.prompt("Due date (day): ");
  let deadline_month = window.prompt("Due date (month, enter as number): ");
  let deadline_year = window.prompt("Due date (year): ");  
  let answer = window.prompt("Would you like to specify a due time or keep it as 11:59 (Y/N)?")
  if(answer == 'Y') {
    let deadline_hours = window.prompt("Due date (hours, enter in 24-hour clock format): ");
    let deadline_minutes = window.prompt("Due date (minutes): ");
    assignment = new Assignment(name, weight, deadline_day, deadline_month, deadline_year, deadline_hours, deadline_minutes);

  } else {
    assignment = new Assignment(name, weight, deadline_day, deadline_month, deadline_year, 23, 59);
  }
  currentCourse.assignmentArr.push(assignment);
}

class Assignment {
  hypothetical_mark;
  mark;
  done = false;
  name;
  weight;
  deadline_year;
  deadline_month;
  deadline_day;
  deadline_hours = 23;
  deadline_minutes = 59;
  constructor(name, weight, deadline_day, deadline_month, deadline_year, deadline_hours, deadline_minutes) {
    this.name = name;
    this.weight = weight;
    this.deadline_day = deadline_day;
    this.deadline_month = deadline_month;
    this.deadline_year = deadline_year;
    this.deadline_hours = deadline_hours;
    this.deadline_minutes = deadline_minutes;
  }
  modifyName() {
    let name = window.prompt("What's your name?: ");
    this.name = name;
  }
  modifyWeight() {
    let weight = window.prompt("Please input the weighting (eg. 0.5 for 50%): ");
    this.weight = weight;
  }
  modifyDay() {
    let day = window.prompt("Due date (day): ");
    this.deadline_day = day;
  }
  modifyYear() {
    let year = window.prompt("Due date (year): ");
    this.deadline_year = year;
  }
  modifyMonth() {
    let month = window.prompt("Due date (month): ");
    this.deadline_month = month;
  }
  modifyHours() {
    let hours = window.prompt("Due date (hour): ");
    this.deadline_hours = hours;
  }
  modifyMinutes() {
    let minutes = window.prompt("Due date (minutes): ");
    this.deadline_minutes = minutes;
  }
  modifyMark() {
    let mark = window.prompt("What mark did you get on the assignment");
    this.mark = mark;
    done = true;
  }
}

let courseArr = [];
let courseBtnArr = [];

function completedAssign() {
    let n = window.prompt("What assignment did you complete?")
    let index = getObjIndex(n, currentCourse.assignmentArr);
    if(index == -1) {
      alert("Assignment not found.");
      return;
    }
    let mark = window.prompt("What mark did you get on the assignment?");
    (currentCourse.assignmentArr[index]).mark = mark;
    (currentCourse.assignmentArr[index]).done = true;
}

function createSpecificBtn(btn, inner) {
  btn.innerHTML = inner;
  btn.style.visibility = "hidden";
  document.body.appendChild(btn);
  btn.className = "mainButtons";
}

function calculateHypotheticalMark() {
  let course = currentCourse;
  let m = getObjIndex (course, courseArr);
  if (m != -1) {
    for (let m = 0; m < assignmentArr.length; m++) {
      if (currentCourse.assignmentArr[m].done == false) {
        //the month line below has some wierd error
        assignmentArr[m].hypothetical_mark = window.prompt("What is the mark you expect to get in the assignment " + assignmentArr[m].name + "?");
        if (currentCourse.assignmentArr[m].hypothetical_mark < 0 || currentCourse.assignmentArr[m].hypothetical_mark > 100) {
            alert("You cannot get this mark on an assignment.");
            return;
          }
      }
    }
    for (let n = 0; n < assignmentArr.length; n++) {
    courseMark;
      if (assignmentArr[m].mark != null) {
        courseMark = courseMark + (((assignmentArr[m].mark) / 100) * assignmentArr[m].weight);
      }
      else if (assignmentArr[m].hypothetical_mark != null) {
        courseMark = courseMark + (((assignmentArr[m].hypothetical_mark) / 100) * assignmentArr[m].weight);
      }
      else {
        alert("No mark for the assignment named " + assignmentArr[m].name + " .");
        return;
      }
    }
    alert("Your hypothetical mark for " + course + " is " + (courseMark*100) + "%.");
    return;
  }
}

function clickedCoursePage() {
  changeVisibility("visible", 0);
}

function makeCourseBtn(course) {
  let button = document.createElement("button");
  button.className = "mainButtons";
  button.innerHTML = course.name;
  document.body.appendChild(button);
  button.onclick = courseClicked;
  courseBtnArr.push(button);
  let i = courseBtnArr.indexOf(button);
  course.btnIndex = i;
}

function courseClicked() {
  changeVisibility("hidden", 0);
  for(let i = 0; i < courseArr.length; i++) {
    if(courseArr[i].name == this.innerHTML) {
      currentCourse = courseArr[i];
    }
  }
}

function mainClicked() {
  changeVisibility("visible", 0);
}

function changeVisibility(visState, all) {
  let opposite = "hidden";
  if(visState == "hidden") opposite = "visible";
  let addBtn = document.getElementById("add");
  addBtn.style.visibility = visState;
  let mTitle = document.getElementById("mainTitle");
  mTitle.style.visibility = visState;
  let sTitle = document.getElementById("secondTitle");
  sTitle.style.visibility = visState;
  let displayBtn = document.getElementById("display");
  displayBtn.style.visibility = visState;
  if(all == 1) {
    backBtn.style.visibility = visState;
    deleteBtn.style.visibility = visState;
    addAssignBtn.style.visibility = visState;
    compBtn.style.visibility = visState;
    neededBtn.style.visibility = visState;
    hypoBtn.style.visibility = visState;
    deleteAssignBtn.style.visibility = visState;
  } else {
    backBtn.style.visibility = opposite;
    deleteBtn.style.visibility = opposite;
    addAssignBtn.style.visibility = opposite;
    compBtn.style.visibility = opposite;
    neededBtn.style.visibility = opposite;
    hypoBtn.style.visibility = opposite;
    deleteAssignBtn.style.visibility = opposite;
  }
  for(let i = 0; i < courseArr.length; i++) {
    courseBtnArr[i].style.visibility = visState;
  }
}

function addCourse() {
  courseName = window.prompt("What course would you like to add?: ");
  if(courseName.length < 1) return;
  let course = new Course(courseName);
  courseArr.push(course);
  makeCourseBtn(course);
}

function deleteCourse() {
  let btn, index;
  for(let i = 0; i < courseArr.length; i++) {
    if(courseArr[i].name == courseBtnArr[currentCourse.btnIndex].innerHTML) {
      index = i;
    }
  }
  //courseBtnArr[(courseArr[index]).btnIndex].parentNode.removeChild(courseBtnArr[(courseArr[index]).btnIndex]);
  courseBtnArr[(courseArr[index]).btnIndex].remove();
  courseBtnArr.splice(courseArr[index].btnIndex, 1);
  courseArr.splice(index, 1);
}

function displayDueAssignments() {
 let year = window.prompt("What is the year for which you would like to see the due assignments for?");
 if(year == "") return;
 let month = window.prompt("What is the month for which you would like to see the due assignments for? (eg. '1' for January)");
 if(month == "") return;
 let day = window.prompt("What is the date for which you would like to see the due assignments for? (eg. '1' for the 1st of the month)");
 if(day == "") return;
 changeVisibility("hidden", 1);
 backPage.style.visibility = "visible";
 for(let i = 0; i < courseArr.length; i++) {
   for(let j = 0; j < (courseArr[i].assignmentArr).length; j++) {
    if( (courseArr[i].assignmentArr[j]).done == false ) {
      let currAssign = courseArr[i].assignmentArr[j];
      let a = document.createElement("body");
      a.innerHTML = courseArr[i].name + " " + currAssign.name + ": Due on " + currAssign.deadline_day + "/" + currAssign.deadline_month +
      "/" + currAssign.deadline_year + " at " + currAssign.deadline_hours + ":" + currAssign.deadline_minutes + " (weight is " +
      (currAssign.weight*100) + "%)";
      a.className = "assignText";
      document.body.appendChild(a);
      arr.push(a);
      let b = document.createElement("br");
      document.body.appendChild(b);
      arr.push(b);
    }
   }
 }
 backPage.onclick = backFromDisplay;
}

function backFromDisplay() {
  console.log("here");
  changeVisibility("visible", 0);
  backPage.style.visibility = "hidden";
  for(let i = 0; i < arr.length; i++) {
    arr[i].remove();
    arr.splice(i, 1);
  }
}

function calculateNeededAssignmentMark() {
  let courseIndex = -1, courseName, assignName, assignIndex = -1, goalMark, numCheck;
  let total = 0, sum = 0, neededMark;
  courseName = currentCourse.name
  courseIndex = getObjIndex(courseName, courseArr);
  if (courseIndex == -1) {
    alert("Course name not found.");
    return;
  }
  let course = courseArr[courseIndex];
  assignName = window.prompt("What assignment would you like calculate for?");
  assignIndex = getObjIndex(assignName, course.assignmentArr);
  if (assignIndex == -1) {
    alert("Assignment name not found.");
    return;
  }
  if (((courseArr[courseIndex]).assignmentArr[assignIndex]).done == true) {
    alert("You have completed this assignment.");
    return;
  }
  let assignment = (courseArr[courseIndex]).assignmentArr[assignIndex];
  goalMark = window.prompt("What mark do you wish to have after completing this assignment? (enter without % sign)");
  goalMark = goalMark / 100;
  for (let i = 0; i < course.assignmentNum; i++) {
    if ((course.assignmentArr[i]).done == true) {
      let currentAssignment = course.assignmentArr[i];
      total = total + currentAssignment.weight;
      sum = sum + ((currentAssignment.weight) * (currentAssignment.mark));
    }
  }
  neededMark = ((goalMark / total) - sum) / ((assignment.weight) / total);
  if (neededMark > 100) alert("You cannot achieve this mark by the end of this assignment");
  else alert("You will need a " + neededMark + "%");
}

function findDaysLeft() {

  courseName = currentCourse.name;
  courseIndex = getObjIndex(courseName, courseArr);
  if (courseIndex == -1) {
    window.alert("Course name not found.")
    return;
  }

  assignmentName = window.prompt("For which assignment from this course would you like to determine the days left till the deadline? ");
  assignmentIndex = getObjIndex(assignmentName, courseArr[courseIndex].assignmentArr);
  if (assignmentIndex == -1) {
    window.alert("Assignment name not found.")
    return;
  }

  let today = new Date();
  let today_year = today.getFullYear();
  let today_month = today.getMonth() + 1;
  let today_date = today.getDate();

  let dd_year = courseArr[courseIndex].assignmentArr[assignmentIndex].deadline_year;
  let dd_month = courseArr[courseIndex].assignmentArr[assignmentIndex].deadline_month;
  let dd_date = courseArr[courseIndex].assignmentArr[assignmentIndex].deadline_day;

  let deadline = new Date(dd_year, dd_month - 1, dd_date);

  let daysLeft = Math.floor((deadline.getTime() - today.getTime()) / (1000 * 3600 * 24));

  window.alert("You have " + daysLeft + " days left until " + assignmentName + " for " + courseName + " is due.");
}

function getObjIndex(n, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == n) return i;
  }
  return -1;
}