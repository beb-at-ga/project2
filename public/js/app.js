
if (typeof data !== 'undefined') {

  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    let weekPart = $('#weekPart').val() || 'All';
    let sWeekPart = (data[2]);

    if ((weekPart === sWeekPart) || (sWeekPart.includes(weekPart))) {
      return true;
    } else if (weekPart === 'All') {
      return true;
    } else {
      return false;
    }
  });

  // Route selection table
  $(document).ready(function () {
    let table = $('#sailings').DataTable({
      data: data,
      // "dom": "",
      "pageLength": 10,
      "order": [
        [3, "asc"],
        [4, "asc"]
      ],
      "columnDefs": [{
          "targets": [5],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [6],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [7],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [8],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [9],
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

      postBody.Description = rowData[0]
      postBody.TerminalDescription = rowData[1];
      postBody.DayOpDescription = rowData[2];
      postBody.Time = rowData[3];
      postBody.VesselName = rowData[4];
      postBody.ScheduleID = rowData[5];
      postBody.SchedRouteID = rowData[6];
      postBody.JourneyID = rowData[7];
      postBody.RouteID = rowData[8];
      postBody.TerminalID = rowData[9];

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

  // Favorites/watchedJourney table
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

    $('#watchedJourneys tbody').on('click', 'td', function (e) {
      e.preventDefault();

      if (table.cell(this).data() === '<button class="waves-effect waves-light btn">Remove</button>') {

        let parentRow = $(this).closest("tr").prev()[0];
        let row = table.row(parentRow);
        let rowData = table.row(parentRow).data();

        let postBody = {};
        // rowData[column]
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

      } else {

        let mode = $("select#preferredTransportToTerminal option:checked" ).val();
        console.log(`mode selected: ${mode}`)
        let parentRow = $(this).closest("tr");
        let rowData = table.row(parentRow).data();

        let postBody = {};
        postBody.TerminalDescription = rowData[3];

        $.ajax( {
          type: 'POST',
          data: JSON.stringify(postBody),
          contentType: 'application/json',
          url: `http://localhost:3000/plans`,
          success: function (postResponse) {
            setEnd(postResponse, mode);
          }
        })
      }
    })
  });
}

$(document).ready(function () {
  $('select:not([multiple])').formSelect();
  // $('.materialboxed').materialbox();
});

