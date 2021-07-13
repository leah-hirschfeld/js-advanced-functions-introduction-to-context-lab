function createEmployeeRecord(employeedata) {
    return {
    firstName: employeedata[0],
    familyName: employeedata[1],
    title: employeedata[2],
    payPerHour: employeedata[3],
    timeInEvents: [],
    timeOutEvents: []
    };
}

function createEmployeeRecords(employeeArays) {
    return employeeArays.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    }
    employeeRecord.timeInEvents.push(clockIn)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
    employeeRecord.timeOutEvents.push(clockOut)

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(function(timeEvent){
        return timeEvent.date === date
    })

    const timeOut = employeeRecord.timeOutEvents.find(function(timeEvent){
        return timeEvent.date === date
    })
    
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(accumulator, date){
        return accumulator + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })

}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(accumulator, employee){
        return accumulator + allWagesFor(employee)
    }, 0)
}