$.fn.dataTable.ext.search.push(
  function (settings, data, dataIndex) {
    let weekPart = $('#weekPart').val();
    let sWeekPart = (data[4]);

    if ((weekPart === sWeekPart) || (sWeekPart.includes(weekPart))) {
      return true;
    } else if (weekPart === 'All') {
      return true;
    } else {
      return false;
    }
  }
);




$(document).ready(function () {
  let table = $('#sailings').DataTable({
    data: data,
    "pageLength": 25,
    "order": [
      [3, "asc"],
      [4, "asc"]
    ],
    "columnDefs": [{
        "targets": [0],
        "visible": false,
        "searchable": false
      },
      {
        "targets": [1],
        "visible": false,
        "searchable": false
      },
      // {
      //   "targets": [2],
      //   "visible": false,
      //   "searchable": false
      // }
    ]
  });

  $('#weekPart').change(function () {
    table.draw();
  });

  $('#sailings tbody').on('click', 'tr', function (e) {
    e.preventDefault();
    console.log(e);
    let row = table.row(this).data();
    // row[column]

    let data = {};

    data.ScheduleID = row[0];
    data.SchedRouteID = row[1];
    data.JourneyID = row[2];
    data.TerminalDescription = row[3];
    data.DayOpDescription = row[4];
    data.Time = row[5];
    data.VesselName = row[6];

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3000/routes2',
      success: function (data) {
        console.log('success');
        console.log(JSON.stringify(data));
      }
    });
  });
});










let loc = document.getElementById('location');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    loc.innerHTML = 'Location request not supported. Your browser blows. You really should updgrade. Not just for the better features but for the vastly improved security.';
  }
}

// To remove after debugging.
function showPosition(position) {
  loc.innerHTML = "Location: " + position.coords.latitude + " / " + position.coords.longitude;
}