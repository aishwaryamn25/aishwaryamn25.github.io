//Code By: Aishwarya Marghatta Nandeesh

//employee data
var employees = [
	{"internalid":"1", "name":"Abe Anderson", "email":"aanderson@javascript.com", "birthdate":"9/25/1974", "supervisor":"3", "2012 Revenue":"100000.00", "2013 Revenue":"0.00"},
	{"internalid":"2", "name":"Bob Benson", "email":"bbenson@javascript.com", "birthdate":"7/13/1972", "supervisor":"3", "2012 Revenue":"150000.00", "2013 Revenue":"0.00"},
	{"internalid":"3", "name":"Chelsea Chastain", "email":"cchastain@javascript.com", "birthdate":"5/7/1968", "supervisor":"", "2012 Revenue":"375000.00", "2013 Revenue":"0.00"},
	{"internalid":"4", "name":"Dwight Dwyer", "email":"ddwyer@javascript.com", "birthdate":"8/23/1982", "supervisor":"3", "2012 Revenue":"125000.00", "2013 Revenue":"0.00"},
	{"internalid":"5", "name":"Eathon Eckhart", "email":"eeckhart@javascript.com", "birthdate":"11/28/1970", "supervisor":"", "2012 Revenue":"200000.00", "2013 Revenue":"0.00"}
];

//Revenue Data
var revenue2013 = [
	{"type":"invoice", "customer":"Franklin", "Employee":"1", "amount":"50000.00"},
	{"type":"invoice", "customer":"Gabby", "Employee":"1", "amount":"25000.00"},
	{"type":"invoice", "customer":"Harry", "Employee":"1", "amount":"30000.00"},
	{"type":"invoice", "customer":"Ingrid", "Employee":"2", "amount":"75000.00"},
	{"type":"invoice", "customer":"Jacob", "Employee":"2", "amount":"60000.00"},
	{"type":"invoice", "customer":"Kelly", "Employee":"4", "amount":"30000.00"},
	{"type":"invoice", "customer":"Lamar", "Employee":"4", "amount":"40000.00"},
	{"type":"invoice", "customer":"Mary", "Employee":"4", "amount":"20000.00"},
	{"type":"invoice", "customer":"Nicole", "Employee":"4", "amount":"70000.00"},
	{"type":"invoice", "customer":"Oscar", "Employee":"5", "amount":"75000.00"},
	{"type":"invoice", "customer":"Patrick", "Employee":"5", "amount":"80000.00"},
	{"type":"invoice", "customer":"Quin", "Employee":"5", "amount":"60000.00"},
	{"type":"invoice", "customer":"Rachel", "Employee":"5", "amount":"100000.00"}
];


//Commission Rules
var commissionRules = [
	{"employee" : "1", "percentage":"15%", "bonus":"2000.00"},
	{"employee" : "2", "percentage":"10%", "bonus":"3000.00"},
	{"employee" : "3", "percentage":"7.5%", "bonus":"5000.00"},
	{"employee" : "4", "percentage":"10%", "bonus":"3000.00"},
	{"employee" : "5", "percentage":"10%", "bonus":"3000.00"}
];

//createTable(employees);

$(document).ready(function() {

    //Datatable for employee data

    $('#table').DataTable({
        "searching": false,
        "paging": false,
        "info": false,
        "data": employees,
        "columns": [
          { "data": "internalid" },
          { "data": "name" },
          { "data": "email" },
          { "data": "birthdate" },
          { "data": "supervisor" },
          { "data": "2012 Revenue" },
          { "data": "2013 Revenue" }
        ]
    });

    //Datatable for Revenue data

    $('#tableRevenue').DataTable({
        "searching": false,
        "paging": false,
        "info": false,
        "data": revenue2013,
        "columns": [
          { "data": "type" },
          { "data": "customer" },
          { "data": "Employee" },
          { "data": "amount" }

        ]
    });

    //Commission Datatable

    $('#tblCommissionRules').DataTable({
        "searching": false,
        "paging": false,
        "info": false,
        "data": commissionRules,
        "columns": [
          { "data": "employee" },
          { "data": "percentage" },
          { "data": "bonus" }

        ]
    });


} );


function dateToDob() { //To calculate date remaining to Birthday
	var i;
	var birthdayCounter ="";
    function daysUntilBirthday(month, day){

				var startDay = new Date('01/01/2014 12:01 AM')
				var y = startDay.getFullYear()
				var endDay = new Date(y, month-1, day);
				startDay.setHours(0, 0, 0, 0);
				if (startDay > endDay) endDay.setFullYear(y+1);
				return Math.round((endDay-startDay)/8.64e7);
			}
            //loop through employee table and adding Next Birthday Column

			for (var i = 0; i < employees.length; i++) {
                var object = employees[i];
                for(var property in object)
                {
                    var searchChar1 = object["birthdate"].search("/");
                    var searchChar2 = object["birthdate"].substring(3, 6).search("/");
                    var birthDay;
                    var birthMonth;
                    birthMonth = object["birthdate"].slice(0, searchChar1);
                    birthDay = object["birthdate"].substring(searchChar1+3, searchChar2+1);
                    if (searchChar2 == 0) birthDay = object["birthdate"].substring(searchChar1+2, searchChar2+2);
                    object["Your Next Birthday is after"] = daysUntilBirthday(birthMonth, birthDay);
                }
                console.log(object);
              }

              //Updated Datatable

              $('#tableNew').DataTable({
                "searching": false,
                "paging": false,
                "info": false,
                "data": employees,
                "columns": [
                  { "data": "internalid" },
                  { "data": "name" },
                  { "data": "email" },
                  { "data": "birthdate" },
                  { "data": "supervisor" },
                  { "data": "2012 Revenue" },
                  { "data": "2013 Revenue" },
                  { "data": "Your Next Birthday is after" }

                ]
            });
    }

function bestCustomer() {
    //to get best customer
        var revenueMax = "";
        var bestTotal;
        var preTotal;

            //loop through employee and revenue to get the best customer

            for (i in employees){

            bestTotal = 0;
            preTotal = 0;
            console.log (employees[i].name, preTotal, bestTotal);

                for (r in revenue2013) {

                    if (employees[i].internalid == revenue2013[r].Employee) {

                            if (Number(revenue2013[r].amount) > bestTotal){

                                preTotal = revenue2013[r].amount;
                                bestTotal = preTotal;

                            } else {

                                bestTotal = preTotal;
                            }

                        console.log(employees[i].internalid, revenue2013[r].Employee, " - amount : " + revenue2013[r].amount + " - preToTal : " + preTotal + " - bestTotal : " + bestTotal );


                        if (bestTotal == revenue2013[r].amount){

                            employees[i]["bestCustomer"] = revenue2013[r].customer;
                        }

                    }


                    if (!employees[i].supervisor && bestTotal == "") {

                        employees[i]["bestCustomer"] = "Supervisor !";
                            console.log(employees[i]["bestCustomer"]);
                    }

                }

            }

            //update employee Datatable

            $('#tableBestCustomer').DataTable({
                "searching": false,
                "paging": false,
                "info": false,
                "data": employees,
                "columns": [
                  { "data": "internalid" },
                  { "data": "name" },
                  { "data": "email" },
                  { "data": "supervisor" },
                  { "data": "bestCustomer" }

                ]
            });
        }


//To calculate 2013 Revenue
function update2013Revenue() {

            var i;
            var update2013Revenue ="";

            //loop through employee and revenue datatable
            for (c in employees) employees[c]['2013 Revenue'] = "";

                for (i in employees){

                    for (r in revenue2013) {

                        if (employees[i].internalid == revenue2013[r].Employee) {

                            employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
                            employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);

                        }

                    }

                    if (employees[i].supervisor) {

                        employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
                        employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
                    }

                }

                //updated datatable
                $('#tblupdate2013Revenue').DataTable({
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "data": employees,
                    "columns": [
                      { "data": "internalid" },
                      { "data": "name" },
                      { "data": "supervisor" },
                      { "data": "2012 Revenue" },
                      { "data": "2013 Revenue" },
                    ]
                });
            }

            //to calculate commission for employees

function CalculateCommission() {

                var i;
                var employeeCommision ="";
                for (c in employees) employees[c]['2013 Revenue'] = "";


                //loop through employee and revenue datatable

                    for (i in employees){

                        for (r in revenue2013) {

                            if (employees[i].internalid == revenue2013[r].Employee) {

                                employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
                                employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);

                            }

                        }

                        if (employees[i].supervisor) {

                            employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
                            employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
                        }

                    }


                    //loop through employee datatable to add commission and bonus
                    for (i in employees) {

                        var searchChar1 = commissionRules[i].percentage.search("%");
                        employees[i]["Commission"] = (employees[i]['2013 Revenue'] * commissionRules[i].percentage.slice(0,searchChar1))/100;

                        if (employees[i]['2012 Revenue'] < employees[i]['2013 Revenue'].toFixed(2)) {
                            employees[i]["Bonus"] = commissionRules[i].bonus;
                        } else employees[i]["Bonus"] = "";

                        if (employees[i]["Bonus"] == "") employees[i]["Bonus"]= "0.00";

                    }

                    //updated table for employee after adding commision and bonus

                    $('#tblCommission').DataTable({
                        "searching": false,
                        "paging": false,
                        "info": false,
                        "data": employees,
                        "columns": [
                          { "data": "internalid" },
                          { "data": "name" },
                          { "data": "supervisor" },
                          { "data": "2012 Revenue" },
                          { "data": "2013 Revenue" },
                          { "data": "Commission" },
                          { "data": "Bonus" }

                        ]
                    });

                }

                //function to calculate Revenue change percentage
    function RevenueChange() {

                    var i;
                    var ratioRevenue ="";
                    for (c in employees) employees[c]['2013 Revenue'] = "";


                    for (i in employees){

                            for (r in revenue2013) {

                                if (employees[i].internalid == revenue2013[r].Employee) {

                                    employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
                                    employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);

                                }

                            }

                    // CALCULATING SUPERVISOR'S REVENUE
                        if (employees[i].supervisor) {

                            employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
                            employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
                        }

                    }

                        for (i in employees) {

                            employees[i]["change"] = parseFloat(((((employees[i]['2013 Revenue'].toFixed(2) - employees[i]['2012 Revenue']))*100)) / employees[i]['2012 Revenue']).toFixed(2);

                            console.log(employees[i]["change"]);
                        }
                        $('#tblRevenueChange').DataTable({
                            "searching": false,
                            "paging": false,
                            "info": false,
                            "data": employees,
                            "columns": [
                              { "data": "internalid" },
                              { "data": "name" },
                              { "data": "supervisor" },
                              { "data": "2012 Revenue" },
                              { "data": "2013 Revenue" },
                              { "data": "change" }

                            ]
                        });

                    }

                    //Function for calculate total income

function CalculatetotalIncome() {

    var i;
    var employeeCommision = "";
    for (c in employees) employees[c]['2013 Revenue'] = "";


        for (i in employees){

            for (r in revenue2013) {

                if (employees[i].internalid == revenue2013[r].Employee) {

                    employees[i]['2013 Revenue']  += Number(revenue2013[r].amount);
                    employees[i]['2013 Revenue'] = Number(employees[i]['2013 Revenue']);

                }
            }

            if (employees[i].supervisor) {

                employees[employees[i].supervisor-1]['2013 Revenue'] += employees[i]['2013 Revenue'];
                employees[employees[i].supervisor-1]['2013 Revenue'] = parseInt(employees[employees[i].supervisor-1]['2013 Revenue']);
            }
        }

        //loop through employee data and add bonus, commission and revenue


        for (i in employees) {

            var searchChar1 = commissionRules[i].percentage.search("%");
            employees[i]["Commission"] = (employees[i]['2013 Revenue'] * commissionRules[i].percentage.slice(0,searchChar1))/100;

            if (employees[i]['2012 Revenue'] < employees[i]['2013 Revenue'].toFixed(2)) {
                employees[i]["Bonus"] = commissionRules[i].bonus;
            } else employees[i]["Bonus"] = "";

            if (employees[i]["Bonus"] == "") employees[i]["Bonus"]= "0.00";

            //console.log(employees[i].internalid , revenue2013[r].Employee , employees[i]['2013 Revenue'], employees[i].supervisor, employees[i]["Commission"]);
            console.log(employees[i]["Commission"],employees[i]["Bonus"] );
            employees[i]["TotalIncome"] = Number(employees[i]['2012 Revenue']) +  Number(employees[i]['2013 Revenue'].toFixed(2)) + Number(employees[i]["Commission"]+ Number(employees[i]["Bonus"]));

        }

        //update employee datatable after addition

        $('#tbltotalIncome').DataTable({
            "searching": false,
            "paging": false,
            "info": false,
            "data": employees,
            "columns": [
              { "data": "internalid" },
              { "data": "name" },
              { "data": "supervisor" },
              { "data": "2012 Revenue" },
              { "data": "2013 Revenue" },
              { "data": "Commission" },
              { "data": "Bonus" } ,
              { "data": "TotalIncome" }
            ]
        });

    }
