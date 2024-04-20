document.addEventListener("DOMContentLoaded", function() {
    var calendar = document.getElementById('calendar');

    function renderCalendar() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();

        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var firstDayOfMonth = new Date(year, month, 1).getDay();

        var days = [];
        for (var i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);

        // Create table headers
        var headerRow = document.createElement('tr');
        var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (var i = 0; i < 7; i++) {
            var th = document.createElement('th');
            th.textContent = daysOfWeek[i];
            headerRow.appendChild(th);
        }
        tbody.appendChild(headerRow);

        // Create table rows and cells
        var row = document.createElement('tr');
        for (var i = 0; i < firstDayOfMonth; i++) {
            var emptyCell = document.createElement('td');
            row.appendChild(emptyCell);
        }

        days.forEach(function(day) {
            var cell = document.createElement('td');
            cell.textContent = day;
            cell.classList.add('day');

            // Add event listener to each day cell
            cell.addEventListener('click', function() {
                // Toggle selected class on click
                cell.classList.toggle('selected');

                // You can add your logic to display events for the selected day here
            });

            row.appendChild(cell);

            if ((firstDayOfMonth + day - 1) % 7 === 6) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
        });

        calendar.innerHTML = '';
        calendar.appendChild(table);
    }

    renderCalendar();
});