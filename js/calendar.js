//Calendar
var current = new Date();
var cmonth;
var day;
var dayOfWeekIndex;
var cyear;
var totalFeb;
var option;
var todayString;

$(document).ready(function(){
	todayString = dateFormat(current);
	
	$('.filterDate').each(function(){
			$(this).html('-' + todayString + '-')
			$(this).on('click', function(){			
				if($('#calendar').is(':visible') && option != parseInt($(this).attr('data-option')))
					return;
				
				//remove this from plugin
				$('#calendar').toggleClass('pos' + $(this).attr('data-option'));
				
				$(this).toggleClass('selected');
				option = parseInt($(this).attr('data-option'));
				dateFormat(current);
				initCalendar();
				$('#calendar').toggle();
			});
	});	
});


function dateFormat(date) {
    cmonth = date.getMonth();
    day = date.getDate();
    dayOfWeekIndex = date.getDay(); // 0-7 index starting on Sunday
    cyear = date.getFullYear();
	return (cmonth + 1) + '/' + day + '/' + cyear;
}

function navCalendar(isPrev) {
    if (isPrev == true) {
        if (cmonth == 0) {
            cmonth = 11;
            cyear -= 1;
        }
        else {
            cmonth -= 1;
        }
    }
    else if (isPrev == false) {
        if (cmonth == 11) {
            cmonth = 0;
            cyear += 1;
        }
        else {
            cmonth += 1;
        }
    }
    initCalendar();
}

function initCalendar() {
    //get the start DAY INDEX of THIS Month of this year
    var firstDayOfMonth = new Date(cyear, cmonth, '1').getDay();
    
    // Check if Leap Year
    if (cmonth == 1) {
        if ((cyear % 100 !== 0) && (cyear % 4 === 0) || (cyear % 400 === 0)) {
            totalFeb = 29;
        } else {
            totalFeb = 28;
        }
    }

    var totalDaysArray = ["31", "" + totalFeb + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];

    var htmlBuilder = '<table><thead><tr><th colspan="7"class="month-name">' + monthNames[cmonth] + ' ' + cyear + '</th></tr></thead><tbody><tr><th><span>S</span></th><th><span>M</span></th><th><span>T</span></th><th><span>W</span></th><th><span>T</span></th><th><span>F</span></th><th><span>S</span></th></tr>';    

    htmlBuilder = htmlBuilder + '<tr>'
    for (var i = 0; i < firstDayOfMonth; i++) {
        htmlBuilder = htmlBuilder + '<td><span>&nbsp;</span></td>';
    }
    var counter = firstDayOfMonth;

	switch (option)
	{
	case 0: // ALL DATES	

	//Allow navigation for all dates
		$('#nextMonth').show();
		$('#previousMonth').show();
	
			for (var j = 1; j <= totalDaysArray[cmonth]; j++) {
				if (counter > 6) {
					htmlBuilder = htmlBuilder + '</tr><tr>';
					counter = 0;
				}
				if (((cmonth +1) + '/' + j + '/' + cyear) == todayString) //Show current date
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" class="today" onclick="selectedDate(this);" onmouseover="$(this).addClass(\'hover\')" onmouseout="$(this).removeClass(\'hover\')">' + j + '</span></td>';
				else //all dates available
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" onclick="selectedDate(this);" onmouseover="$(this).addClass(\'hover\')" onmouseout="$(this).removeClass(\'hover\')">' + j + '</span></td>';
				counter++;
			}
	break;
	case 1: // PAST DATES ONLY
				
			//Allow navigation for past dates only
			$('#previousMonth').show();
			$('#nextMonth').hide();
				
			if (cmonth == current.getMonth() && cyear == current.getFullYear()) 
				day = current.getDate();
			else 
				day = 32;
			
			for (var j = 1; j <= totalDaysArray[cmonth]; j++) {
				if (counter > 6) {
					htmlBuilder = htmlBuilder + '</tr><tr>';
					counter = 0;
				}
				if (((cmonth +1) + '/' + j + '/' + cyear) == todayString) //Show current date
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" class="today" onclick="selectedDate(this);" onmouseover="$(this).addClass(\'hover\')" onmouseout="$(this).removeClass(\'hover\')">' + j + '</span></td>';
				else if (j > day) //future dates unavailable
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" class="unavailable">' + j + '</span></td>';
				else //past dates available
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" onclick="selectedDate(this);" onmouseover="$(this).addClass(\'hover\')" onmouseout="$(this).removeClass(\'hover\')">' + j + '</span></td>';
				counter++;
			}
	break;
	case 2: // FUTURE DATES ONLY

			//Allow navigation for future dates only
			$('#previousMonth').hide();
			$('#nextMonth').show();
			
			if (cmonth == current.getMonth() && cyear == current.getFullYear()) 
				day = current.getDate();
			else
				day = 1;

			
			for (var j = 1; j <= totalDaysArray[cmonth]; j++) {
				if (counter > 6) {
					htmlBuilder = htmlBuilder + '</tr><tr>';
					counter = 0;
				}
				if (((cmonth +1) + '/' + j + '/' + cyear) == todayString) //Show current date
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" class="today" onclick="selectedDate(this);" onmouseover="$(this).addClass(\'hover\')" onmouseout="$(this).removeClass(\'hover\')">' + j + '</span></td>';
				else if (j < day) //past dates unavailable
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" class="unavailable">' + j + '</span></td>';
				else //future dates available
					htmlBuilder = htmlBuilder + '<td><span data-date="' + (cmonth + 1) + '/' + j + '/' + cyear + '" onclick="selectedDate(this);" onmouseover="$(this).addClass(\'hover\')" onmouseout="$(this).removeClass(\'hover\')">' + j + '</span></td>';
				counter++;
			}
	break;
	default:
	}

    htmlBuilder = htmlBuilder + '</tr></tbody></table>';

    $('#calendarBody').html(htmlBuilder);
	
}


function selectedDate(dateObj) {
    if ($(dateObj).closest('div').attr('id') == 'calendarBody') {
		$('body').find('div.selected').html($(dateObj).attr('data-date')).removeClass('selected');
		$('#calendar').removeClass('pos0 pos1 pos2').hide();
    }
}