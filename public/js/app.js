// console.log('Hello');
// let data;

if (typeof data !== 'undefined') {

  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    let weekPart = $('#weekPart').val() || 'All';
    let sWeekPart = (data[4]);

    if ((weekPart === sWeekPart) || (sWeekPart.includes(weekPart))) {
      return true;
    } else if (weekPart === 'All') {
      return true;
    } else {
      return false;
    }
  });

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
        {
          "targets": [2],
          "visible": false,
          "searchable": false
        }
      ]
    });

    $('#weekPart').change(function () {
      table.draw();
    });

    $('#sailings tbody').on('click', 'tr', function (e) {
      e.preventDefault();
      console.log(e);

      let row = table.row(this);
      let rowData = table.row(this).data();
      // rowData[column]

      let postBody = {};

      postBody.ScheduleID = rowData[0];
      postBody.SchedRouteID = rowData[1];
      postBody.JourneyID = rowData[2];
      postBody.TerminalDescription = rowData[3];
      postBody.DayOpDescription = rowData[4];
      postBody.Time = rowData[5];
      postBody.VesselName = rowData[6];

      $.ajax({
        type: 'POST',
        data: JSON.stringify(postBody),
        contentType: 'application/json',
        url: '/routes',
        success: function (postResponse) {
          console.log('success');
          console.log(JSON.stringify(postResponse));
          window.location.replace("/preferences");
        }
      });
    });
  });

  $(document).ready(function () {
    let table = $('#watchedJourneys').DataTable({
      data: data,
      "dom": "",
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
        {
          "targets": [2],
          "visible": false,
          "searchable": false
        }
      ]
    });

    $('#weekPart').change(function () {
      table.draw();
    });

    $('#watchedJourneys tbody').on('click', 'tr', function (e) {
      e.preventDefault();
      console.log(e);

      let row = table.row(this);
      let rowData = table.row(this).data();
      // rowData[column]

      let postBody = {};

      postBody.ScheduleID = rowData[0];
      postBody.SchedRouteID = rowData[1];
      postBody.JourneyID = rowData[2];
      postBody.TerminalDescription = rowData[3];
      postBody.DayOpDescription = rowData[4];
      postBody.Time = rowData[5];
      postBody.VesselName = rowData[6];

      $.ajax({
        type: 'POST',
        data: JSON.stringify(postBody),
        contentType: 'application/json',
        url: `http://localhost:3000/routes/${rowData[2]}?_method=DELETE`,
        success: function (postResponse) {
          console.log('success');
          console.log(JSON.stringify(postResponse));      
          row.remove().draw();
        }
      })
      .then(() => {
        
      });
    });
  });
}

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