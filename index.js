// Your code here
//A function to initialize an employee record object
function createEmployeeRecord([firstName, familyName, title, payRate]) {
  return {
    firstName:firstName,
    familyName:familyName,
    title: title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents:[]
  };
}
//A function to add an array of records into an employee record using createEmployeeRecord
function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map(oneArray => createEmployeeRecord(oneArray))
}
    
//A function for adding the time in object to an employee object
function createTimeInEvent(employeeRecord, dateStamp){
    let timeInObject = { 
      type : "TimeIn",
      hour : parseInt(dateStamp.slice(11,15),10),
      date: dateStamp.slice(0,10)
    };
    employeeRecord.timeInEvents.push(timeInObject);
    return employeeRecord;
}
    
//Initializing an employee record to test the functions
const employeeRecord = {
  firstName: "Samuel",
  lastName: "Mbugua",
  title: "Architect",
  payPerHour: 42,
  timeInEvents: [{ type: "TimeIn", hour: 1000, date: "2023-03-31" }],
  timeOutEvents: [{ type: "TimeOut", hour: 1400, date: "2023-03-31"}]
};
const inDateStamp = "2023-04-01 1235";
    
createTimeInEvent(employeeRecord,inDateStamp);
console.log(employeeRecord);
    
//A function for adding the time out object to an employee object
function createTimeOutEvent(employeeRecord, dateStamp){
  let timeOutObject = {
    type : "TimeOut",
    hour : parseInt(dateStamp.slice(11,15),10),
    date: dateStamp.slice(0,10)
  };
  employeeRecord.timeOutEvents.push(timeOutObject);
  return employeeRecord;
}
const outDatestamp = "2023-04-01 1535";
createTimeOutEvent(employeeRecord,outDatestamp);
console.log(employeeRecord);
    
//A function for checking how many hours a specific employee worked on a certain date
function hoursWorkedOnDate(employeeRecordObject,checkDate){
  let hoursWorked = 0;
  for (let i = 0; i < employeeRecordObject.timeInEvents.length; i++) {
    if ((employeeRecordObject.timeInEvents[i].date == checkDate) && (employeeRecordObject.timeOutEvents[i].date == checkDate)) {
    console.log("found It")
    hoursWorked = (employeeRecordObject.timeOutEvents[i].hour - employeeRecordObject.timeInEvents[i].hour)/100;
    }
  }
  console.log(hoursWorked);
  return hoursWorked;
}
const checkDate = "2023-03-31";
hoursWorkedOnDate(employeeRecord,checkDate);
    
//A function to determine how much an employee earned on a certain date base on their hourly rate
function wagesEarnedOnDate(employeeRecordWages,checkDateWages) {
  return hoursWorkedOnDate(employeeRecordWages,checkDateWages)*employeeRecordWages.payPerHour
}
console.log(wagesEarnedOnDate(employeeRecord,checkDate));
   
//A function to determine how much an employee earned on all dates in the records
function allWagesFor(employeeRecordAllWages){
  return employeeRecordAllWages.timeInEvents.reduce((accumulator,currentEvent) => {
    accumulator += wagesEarnedOnDate(employeeRecordAllWages, currentEvent.date);
    console.log(`Total Wage : ${accumulator}`)
    return accumulator;
    },0);
}
console.log(allWagesFor(employeeRecord));

// A function for calculating the sum of all wages owed to employees
function calculatePayroll (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((accumulator, currentRecord) => {
    accumulator +=  allWagesFor(currentRecord)
    console.log(accumulator);
    return accumulator;
    },0 );
}
