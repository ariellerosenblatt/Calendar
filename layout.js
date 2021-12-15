var datenow = new Date(); 
var calendar = document.getElementById("cal");
// var newmonth = new Month(datenow.getMonth(), datenow.getFullYear(), 1);
var newmonth = new Month(datenow.getMonth(), datenow.getFullYear(), datenow.getDay(), 'todays event');
var currmonth = datenow.getMonth();
var curryear = datenow.getFullYear();
var username;
var token; 
newmonth.initializeWeeks();
fetch('./API/checksession.php', 
        {
            method: "POST",
            // body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'}
        })
        .then(response => response.json()) //whats going to be sent back
        .then(data => {
            console.log(data);
            if(data.session)
            {
                username = data.session;
                token = data.token;
                getevents();
            }
        });

var monthNames = ["January", "February", "March", "April", "May","June","July","August", "September", "October", "November", "December"];
document.getElementById("changemonth").innerText = monthNames[currmonth];


var nextmonth = document.getElementById("nextmonth").addEventListener("click", function() {
    currmonth++;
    if (currmonth > 11)
    {
        curryear++; 
        currmonth = 0;
    }
    newMonth = new Month(currmonth, curryear, 0, events);
    
    calendar.innerHTML = "";
    calendar.innerHTML = "<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th> </tr></thead>";
    document.getElementById("changemonth").innerText = monthNames[currmonth];
    document.getElementById("changeyear").innerText = curryear;

    newMonth.initializeWeeks();
    getevents();

});
var prevmonth = document.getElementById("prevmonth").addEventListener("click", function() {
    currmonth--;
    if (currmonth < 0)
    {
        curryear--; 
        currmonth = 11;
    }
    newMonth = new Month(currmonth, curryear, 0, 'next months events');
    calendar.innerHTML = "";
    document.getElementById("changemonth").innerText = monthNames[currmonth];
    newMonth.initializeWeeks();
    getevents();
});

function Day(date, events) {
    this.dayofmonth = date.getDate();
    this.dayofweek = date.getDay();
    this.year = date.getFullYear();
    this.events = events; 
    this.date = date; 
    this.time = date.timeee;
    this.priority = date.priority;
    this.shareduser = date.shareduser;
    this.draw = function(row) 
    {
        var col = document.createElement('td');
        var span = document.createElement('span');
        var divcontainer = document.createElement('div');
        if (this.events !== null){
            for (let i = 0; i<this.events.length; i++){
                if (this.events[i] !== undefined){
                    var day = new Date(this.events[i].date);
                    if ((day.getUTCDate()) == this.dayofmonth && day.getUTCMonth() == this.date.getUTCMonth() && day.getUTCFullYear() == this.date.getFullYear())
                    {
                        var div = document.createElement('div');
                        
                        if(day.getUTCDate() == datenow.getUTCDate())
                        {
                            window.alert("YOU HAVE AN EVENT TODAY!");
                        }

                        div.id = this.events[i].id; 
                        div.date = this.events[i].date;
                        div.time = this.events[i].time;
                        div.prio = this.events[i].priority;
                        div.shared = this.events[i].shareduser;
                        

                        if(div.prio == 1) //taking care of the priority colors for non-shared events
                        {
                            divcolor(div, "#ffe6e6");
                        }
                        else if(div.prio == 2)
                        {
                            divcolor(div, "#ffcccc");
                        }
                        else if(div.prio == 3)
                        {
                            divcolor(div, "#ffb3b3");
                        }
                        else if(div.prio == 4)
                        {
                            divcolor(div, "#ff9999");
                        }
                        else if(div.prio == 5)
                        {
                            divcolor(div, "#ff8080");
                        }
                        else if(div.prio == 6)
                        {
                            divcolor(div, "#ff6666");
                        }
                        else if(div.prio == 7)
                        {
                            divcolor(div, "#ff4d4d");
                        }

                        else if(div.prio == 8)
                        {
                            divcolor(div, "#ff3333");
                        }
                        else if(div.prio == 9)
                        {
                            divcolor(div, "#ff1a1a");
                        }
                        else if(div.prio == 10)
                        {
                            divcolor(div, "#e60000");
                        }
                        div.innerText += this.events[i].title;
                        
                        document.getElementById("pickcolor").addEventListener("click", function(event) {
                            
                            color(div);
                        });
           
                        if (div.shared !== "-1" && div.shared !== "") { //taking care of the priority colors for shared events 
                            if(div.prio == 1)
                            {
                                divcolor(div, "#e6f2ff");
                            }
                        else if(div.prio == 2)
                            {
                                divcolor(div, "#cce6ff");
                            }
                        else if(div.prio == 3)
                            {
                                divcolor(div, "#b3d9ff");
                            }
                        else if(div.prio == 4)
                            {
                                divcolor(div, "#99ccff");
                            }
                        else if(div.prio == 5)
                            {
                                divcolor(div, "#80bfff");
                            }
                        else if(div.prio == 6)
                            {
                                divcolor(div, "#66b3ff");
                            }
                        else if(div.prio == 7)
                            {
                                divcolor(div, "#4da6ff");
                            }

                        else if(div.prio == 8)
                            {
                                divcolor(div, "#3399ff");
                            }
                        else if(div.prio == 9)
                            {
                                divcolor(div, "#1a8cff");
                            }
                        else if(div.prio == 10)
                            {
                                divcolor(div, "#0073e6");
                            }
                        }

                        divcontainer.appendChild(div);
                        // console.log(div);
                        div.addEventListener("click", function(event){ //clicking on each event
                            
                            var dateee= this.date;
                            var timeee= this.time;
                            var prio = this.prio;
                            var shared = this.shared;

                            console.log(this.id);
                            document.getElementById("editeventdiv").style.display = "block";
                            document.getElementById("idofevent").value = this.id;
                            document.getElementById("shown").style.display="block";
                            
                            document.getElementById("eventinfo").innerText = " Priority: " + prio;
                            console.log(shared);
                            if (shared !== "-1" && shared !== "") {
                                document.getElementById("eventinfo").innerText += " Event Shared By: " + shared;
                                // div.style.backgroundColor = "black";
                            }
                            document.getElementById("eventinfo").innerText += " Date: " + dateee + " Time: " + timeee;
                            console.log(prio);

                            
                            
                        });
                    
                        document.getElementById("canceledit").addEventListener("click", function(event) //if cancel, go away and be able to add
                        {
                            document.getElementById("editeventdiv").style.display = "none";
                            document.getElementById("idofevent").value = 0;
                 
                           
                        });

                    }

                }
            }
        }
        span.innerText = this.dayofmonth;
        span.date = this.date;
        col.appendChild(span);
        col.appendChild(divcontainer);
        row.appendChild(col);
    } 

    this.deleteevents = function(event)
    {

        if (this.events != null){
            for (let i = 0; i< this.events.length; i++){
                console.log(this.events[i]);
                if(event == this.events[i]){
                    delete this.events[i];
                    break
                }
            }
        }

    }

    this.addevents = function(event)
    {
        if (this.events == null){
            this.events=[];
        }
        this.events.push(event);
       

    }

    this.editevents = function(event)
    {

    }
}



function Week(days, events) {
    this.events = events;
    this.days = days; 
    this.startday = days[0].date;
    this.endday = days[days.length - 1].date;

    this.draw = function()
    {
        var row = document.createElement('tr');
        for (day in days)
        {
            days[day].draw(row);
        }
        calendar.appendChild(row);

    }

    this.weekLocation = function() 
    {

    }


}

function color(div)
{
    var colorful = document.getElementById("colorr").value;
    div.style.backgroundColor = colorful;
    console.log(colorful);
}

function divcolor(div, color)
{
    div.style.backgroundColor = color;
}




function Month(currmonth, year, day, events) {
    this.daysinMonth;
    this.currmonth = (currmonth + 1);
    this.year = year; 
    this.events = events;
    this.weeks = [];
    this.day = day;
    this.totaldays= [];

    this.initializeWeeks = function() 
    {
      var lastday = new Date(year, currmonth+1, 0).getDate(); 
      days = [];
      var firstday = new Date(year, (currmonth), 1);
      for (var t=0; t<lastday; t++)
      {
         firstday.setDate(t+1);
         let curday = new Day(firstday, this.events)
         days.push(curday);
         this.totaldays.push(curday);
         if(firstday.getDay() == 6)
         {
            this.weeks.push(new Week(days, this.events));
            days = [];
         }
      }
    if(days.length>0)
    {
        this.weeks.push(new Week(days, this.events));
    }
      var prevlastday = new Date(year, currmonth+1, 0); 
      pastdaycounter = 0;
      var count = 0;
      while (this.weeks[0].days.length < 7)
      { 
        this.weeks[0].days.unshift(new Day(prevlastday, null));
        prevlastday = new Date(year, currmonth+1, --pastdaycounter);
        count++;

      }
      this.draw();

    }



    this.draw = function()
    { 
        document.getElementById('cal').innerHTML='';
        if (this.year==datenow.getFullYear() && this.month==datenow.getMonth()){
            document.getElementById('currweek').innerHTML='';
            calendar = document.getElementById("currweek");
            this.weeks[0].draw();
            calendar = document.getElementById("cal");

        }
        for (week in this.weeks)
        {
            this.weeks[week].draw();
        }

        
    }
    
    this.next = function() 
    {

        if (currmonth < 12) 
        {
            currmonth++;
        }
        var span = document.createElement('span');
        span.innerText = this.dayofmonth;
        var monthText = monthNames[currmonth-1];
        
        document.getElementById("changemonth").innerText = monthText;
        document.getElementById("changeyear").innerText = curryear;

        this.draw();
    }


    this.prev = function() 
    {
        if (currmonth > 1) 
        {
            currmonth--;
        }
        var span = document.createElement('span');
        span.innerText = this.dayofmonth;
        var monthText = monthNames[currmonth-1];
        document.getElementById("changemonth").innerText = monthText;
        this.draw();
    }
}


document.getElementById("yellow").addEventListener("click", function(event) //the buttons to change the page color
{
    changeBodyBg("#ffffcc");
});
document.getElementById("lime").addEventListener("click", function(event)
{
    changeBodyBg("#d6f5d6");

});
document.getElementById("blue").addEventListener("click", function(event)
{
    changeBodyBg("#cce6ff");

});
document.getElementById("pink").addEventListener("click", function(event)
{
    changeBodyBg("#ffccff");

});
document.getElementById("purple").addEventListener("click", function(event)
{
    changeBodyBg("#e0ccff");

});


function changeBodyBg(color){
    document.body.style.background = color;
}


document.getElementById("deleteevent").addEventListener("click", function(event) {
    deleteevent();
});

function deleteevent() {
        const data = {'id': document.getElementById("idofevent").value, 'token':token};
        console.log(data);
        fetch('./API/delete.php', 
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json'}
            })
        .then(response => response.json()) //whats going to be sent back
        .then(data => {
            getevents();
            console.log(data);
        });
}


document.getElementById("addevent").addEventListener("click",function(event){ //addevent function 
        console.log("ALOHA");
        var datepicker = document.getElementById("date");
                    var dateArray = datepicker.value.split('-');
                    var month = dateArray[1];
                    var day = dateArray[2].split('T')[0];
                    var time = dateArray[2].split('T')[1];
                    var eventname = document.getElementById('event').value;
                    var date = datepicker.value.substring(0,10);
                    var event_priority = parseInt(document.getElementById("insertpriority").value); 
                    var shareduser = document.getElementById("insertshareduser").value; 
                    console.log(username);

        const data = {'username': username, 'event_date': date, 'event_time': time, 'event_title': eventname, 'event_priority': event_priority, 'shareduser': shareduser, 'token':token};
        console.log(data);
        fetch('./API/add.php', 
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json'}
            })
        .then(response => response.json()) //whats going to be sent back
        .then(data => {
            // console.log(data);
            getevents();
            console.log(data);
        });
    
    });
function getevents() //getting the events
{
    // console.log("HI");
    const data = {'username': username, 'token':token};
    // console.log(data);
    fetch('./API/getevents.php', 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'}
        })
        .then(response => response.json()) //whats going to be sent back
        .then(data => {
            // console.log(data);
            if (data.errormessage != "")
            {
                var out = data.errormessage;
            }
            events = data;
            newmonth = new Month(currmonth, curryear, 0, events);
            newmonth.initializeWeeks();
            
        });
    }
document.getElementById("editevent").addEventListener("click", function(event){
    edit();
});

function edit(){ //editing the events

    var datepicker = document.getElementById("hiddeninput");
    var dateArray = datepicker.value.split('-');
    var month = dateArray[1];
    var day = dateArray[2].split('T')[0];
    var time = dateArray[2].split('T')[1];
    var eventname = document.getElementById('editeventname').value;
    var date = datepicker.value.substring(0,10);
     var event_priority = document.getElementById("editpriority").value; 
     var shareduser = document.getElementById("editshareduser").value; 

    const data = {'id': document.getElementById("idofevent").value, 'username': document.getElementById("loginusername").value, 'event_date': date, 'event_time': time, 'event_title': eventname, 'event_priority': event_priority, 'shareduser': shareduser, 'token':token};
    // console.log(data);
    fetch('./API/edit.php', 
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json'}
    })
    .then(response => response.json()) //whats going to be sent back
    .then(data => {
        getevents();
        console.log(data);
    });

}


document.getElementById("register").addEventListener("submit", function(event){ //registering user
    event.preventDefault(); 
    console.log("HI");
    const data = {'username': document.getElementById("regusername").value, 'password': document.getElementById("regpw1").value, 'password2': document.getElementById("regpw2").value};
    console.log(data);
    fetch('./API/register.php', 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'}
        })
        .then(response => response.json()) //whats going to be sent back
        .then(data => {
            console.log(data);
            if (data.errormessage != "")
            {
                var out = data.errormessage;
                document.getElementById("registeroutput").innerText = out;
            }
        });
});


document.getElementById("login").addEventListener("submit", function(event){ //logging in user
    event.preventDefault();
    console.log("HI");
    const data = {'loginusername': document.getElementById("loginusername").value, 'loginpassword': document.getElementById("loginpassword").value};
    console.log(data);
    fetch('./API/login2.php', 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'}
        })
        .then(response => response.json()) //whats going to be sent back
        .then(data => {
            console.log(data);
            if (data.errormessage != "")
            {
                var out = data.errormessage;
                document.getElementById("loginoutput").innerText = out;
            }
            else
            {
                console.log("Hey");
                document.getElementById("loginoutput").innerHTML = "Login Successful!" + " Welcome " + document.getElementById("loginusername").value;
                token = data.token;
                getevents();
            }
            username = document.getElementById("loginusername").value;
            document.getElementById("loginusername").value = "";
            document.getElementById("loginpassword").value = "";
        });
});

document.getElementById("logout").addEventListener("click", function(event){ //logging out user
    event.preventDefault();
    console.log("HI");
    const data = {'loginusername': document.getElementById("loginusername").value, 'loginpassword': document.getElementById("loginpassword").value};
    console.log(data);
    fetch('./API/logout.php', 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'}
        })
        username = "";
        token = "";
        getevents();

});
