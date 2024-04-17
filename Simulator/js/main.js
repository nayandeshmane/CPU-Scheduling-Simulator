var processes = [
  {
    id: 1,
    burst_time: 10,
    arrival_time: 0,
    priority: 1,
  },
  {
    id: 2,
    burst_time: 50,
    arrival_time: 10,
    priority: 1,
  },
  {
    id: 3,
    burst_time: 65,
    arrival_time: 40,
    priority: 1,
  },
  {
    id: 4,
    burst_time: 30,
    arrival_time: 80,
    priority: 1,
  },
  {
    id: 5,
    burst_time: 90,
    arrival_time: 90,
    priority: 1,
  },
  {
    id: 6,
    burst_time: 25,
    arrival_time: 120,
    priority: 1,
  },
];

let headers = ["Process Id", "Burst Time", "Arrival Time", "Priority"];

function createTable() {
  let table = $("#table"); // Reference to the table element in the HTML document
  let head = "";
  for (h in headers) {
    // Loop through each header name
    head += "<th>" + headers[h] + "</th>"; // Create table header tags with header names
  }
  table.append(`<thead><tr>${head}</tr></thead>`);

  data = "";
  for (p in processes) {
    // Loop through each process object in the 'processes' array
    let row = "";
    for (obj in processes[p]) {
      row += "<td>" + processes[p][obj] + "</td>";
    }
    data += "<tr>" + row + "</tr>"; // Create table row with the processed data
  }
  table.append(`<tbody>${data}</tbody>`);
}

function displayTable() {
  $("#table").empty();
  createTable();
}

function orderProcess() {
  let i = 0;
  processes.forEach(function (p) {
    p.id = i + 1;
    i++;
  });
}

function openAddModal() {
  $("#modal_process_id").val(processes.length + 1);
  $("#modal_burst_time").val(Math.floor(Math.random() * 100));
  $("#modal_arrival_time").val(Math.floor(Math.random() * 100));
  $("#modal_priority").val(Math.floor(Math.random() * 100));
}

// add process function
function addProcess() {
  //let table = document.getElementById('table');

  // Check if burst time is less than 1, if so, display error message
  if ($("#modal_burst_time").val() < 1) {
    $("#error_bt").removeAttr("hidden");
  } else {
    $("#error_bt").attr("hidden", true);
  }

  // Check if arrival time is less than 0, if so, display error message
  if ($("#modal_arrival_time").val() < 0) {
    $("#error_at").removeAttr("hidden");
  } else {
    $("#error_at").attr("hidden", true);
  }

  // Check if priority is less than 0, if so, display error message
  if ($("#modal_priority").val() < 0) {
    $("#error_pt").removeAttr("hidden");
  } else {
    $("#error_pt").attr("hidden", true);
  }

  // If all input values are valid, proceed to add the process
  if (
    $("#modal_burst_time").val() > 0 &&
    $("#modal_arrival_time").val() >= 0 &&
    $("#modal_priority").val() >= 0
  ) {
    let input_burst = Number($("#modal_burst_time").val());
    let input_arrival = Math.max($("#modal_arrival_time").val(), 0); // Ensure arrival time is non-negative
    let input_priority = Math.max($("#modal_priority").val(), 0); // Ensure priority is non-negative

    // Create a new process object with the input values
    obj = {
      id: processes.length + 1,
      burst_time: Number(input_burst),
      arrival_time: Number(input_arrival),
      priority: Number(input_priority),
    };

    processes.push(obj);
    displayTable();
    $("#modal_add").modal("toggle");
  }
}

function openEditModal() {
      // Select the dropdown element for editing
  let $dropdown_edit = $("#modal_edit_select");

    // Clear existing options in the dropdown
  $dropdown_edit.empty();

  for (i = 0; i < processes.length; i++) {
    $dropdown_edit.append(
      $("<option />")
        .val(processes[i].id)
        .text("Process " + processes[i].id)
    );
    // $dropdown.append(new Option("Process "+processes[i].id, processes[i].id))
  }

    // Enable or disable input fields based on the availability of processes
  if (processes.length != 0) {
    $("#modal_edit_select").attr("disabled", false);
    $("#modal_edit_burst_time").attr("disabled", false);
    $("#modal_edit_arrival_time").attr("disabled", false);
    $("#modal_edit_priority").attr("disabled", false);
    $("#modal_edit_burst_time").attr("value", processes[0].burst_time);
    $("#modal_edit_arrival_time").attr("value", processes[0].arrival_time);
    $("#modal_edit_priority").attr("value", processes[0].priority);
    $("#modal_edit_burst_time").val(processes[0].burst_time);
    $("#modal_edit_arrival_time").val(processes[0].arrival_time);
    $("#modal_edit_priority").val(processes[0].priority);
  } else {
    $("#modal_edit_select").attr("disabled", true);
    $("#modal_edit_burst_time").attr("disabled", true);
    $("#modal_edit_arrival_time").attr("disabled", true);
    $("#modal_edit_priority").attr("disabled", true);
  }
  $dropdown_edit.on("change", function () {
    let process_edit_selected = $("#modal_edit_select").val();
    $("#modal_edit_burst_time").attr(
      "value",
      processes[process_edit_selected - 1].burst_time
    );
    $("#modal_edit_arrival_time").attr(
      "value",
      processes[process_edit_selected - 1].arrival_time
    );
    $("#modal_edit_priority").attr(
      "value",
      processes[process_edit_selected - 1].priority
    );

    $("#modal_edit_burst_time").val(
      processes[process_edit_selected - 1].burst_time
    );
    $("#modal_edit_arrival_time").val(
      processes[process_edit_selected - 1].arrival_time
    );
    $("#modal_edit_priority").val(
      processes[process_edit_selected - 1].priority
    );
  });
}

// Edit process function
function editProcess() {
  if (processes.length != 0) {
    if ($("#modal_edit_burst_time").val() < 1) {
      $("#error_edit_bt").removeAttr("hidden");
    } else {
      $("#error_edit_bt").attr("hidden", true);
    }
    if ($("#modal_edit_arrival_time").val() < 0) {
      $("#error_edit_at").removeAttr("hidden");
    } else {
      $("#error_edit_at").attr("hidden", true);
    }
    if ($("#modal_edit_priority").val() < 0) {
      $("#error_edit_pt").removeAttr("hidden");
    } else {
      $("#error_edit_pt").attr("hidden", true);
    }
    if (
      $("#modal_edit_burst_time").val() > 0 &&
      $("#modal_edit_arrival_time").val() >= 0 &&
      $("#modal_edit_priority").val() >= 0
    ) {
      let process_id = Number($("#modal_edit_select").val());
      let new_burst_time = Number($("#modal_edit_burst_time").val());
      let new_arrival_time = Number($("#modal_edit_arrival_time").val());
      let new_priority = Number($("#modal_edit_priority").val());
      if (new_burst_time === "") {
        new_burst_time = processes[process_id - 1].burst_time;
      }
      if (new_arrival_time === "") {
        new_arrival_time = processes[process_id - 1].arrival_time;
      }
      if (new_priority === "") {
        new_priority = processes[process_id - 1].priority;
      }

      processes[process_id - 1].burst_time = Number(new_burst_time);
      processes[process_id - 1].arrival_time = Number(new_arrival_time);
      processes[process_id - 1].priority = Number(new_priority);
      $("#modal_edit").modal("toggle");
    }
  } else {
    $("#modal_edit").modal("toggle");
  }
  displayTable();
}

function openRemoveModal() {
  // $('#modal_remove').modal();
  // $('select').formSelect();
  //   $("#modal_remove_select").formSelect();
  // let options= processes.map(process=>`<option value =${process.id}>"Process "${process.id}</option>`).join('\n');
  let $dropdown_remove = $("#modal_remove_select");
  $dropdown_remove.empty();
  for (i = 0; i < processes.length; i++) {
    $dropdown_remove.append(
      $("<option />")
        .val(processes[i].id)
        .text("Process " + processes[i].id)
    );
    //     // $dropdown.append(new Option("Process "+processes[i].id, processes[i].id))
  }
  // $('#modal_remove_select').html(options);
}

// Remove process function
function removeProcess() {
  let removing_array = $("#modal_remove_select").val();
  let i = 0;
  for (i = 0; i < removing_array.length; i++) {
    let j = 0;
    processes.forEach(function (p) {
      if (removing_array[i] == p.id) {
        processes.splice(j, 1);
      }
      j++;
    });
  }
  orderProcess();
  displayTable();
}

function start() {
  init();
  $("#gantt").removeAttr("hidden");
  $("#result").removeAttr("hidden");
  $('[data-toggle="tooltip"]').tooltip();
  let checked = [false, false, false, false, false, false, false, false, false];
  if ($("#fcfs_switch").prop("checked") === true) {
    FCFS(false);
    checked[0] = true;
  }
  if ($("#sjf_switch").prop("checked") === true) {
    SJFNonPre(false);
    checked[1] = true;
  }
  if ($("#srtf_switch").prop("checked") === true) {
    SJFPre(false);
    checked[2] = true;
  }
  if ($("#ljf_switch").prop("checked") === true) {
    LJFNonPre(false);
    checked[3] = true;
  }
  if ($("#lrtf_switch").prop("checked") === true) {
    LJFPre(false);
    checked[4] = true;
  }
  if ($("#priority_switch").prop("checked") === true) {
    priorityNonPre(false);
    checked[5] = true;
  }
  if ($("#priority_pre_switch").prop("checked") === true) {
    priorityPre(false);
    checked[6] = true;
  }
  if ($("#roundrobin_switch").prop("checked") === true) {
    roundRobin(false);
    checked[7] = true;
  }

  displayGanttChart();
  displayResultTable();
  findBest(checked);

  for (b in bestAlgo) {
    let row = "";
    row +=
      "<span>" + "Algorithm" + " : " + bestAlgo[b].algorithm + "<br></span>";
    row +=
      "<span>" +
      "CPU Utilization" +
      " : " +
      bestAlgo[b].cpu_util +
      "<br></span>";
    row +=
      "<span>" + "Throughput" + " : " + bestAlgo[b].throughput + "<br></span>";
    row +=
      "<span>" + "TurnAround Time" + " : " + bestAlgo[b].tat + "<br></span>";
    row += "<span>" + "Waiting Time" + " : " + bestAlgo[b].wt + "<br></span>";
    row += "<span>" + "Response Time" + " : " + bestAlgo[b].rt + "<br></span>";
    $("#final_result").append(`<li>${row}<br></li>`);
  }
  $("html, body").animate(
    {
      scrollTop: $("#result_div").offset().top,
    },
    0
  );
}

//Gantt chart open/closed function
function openGantt(id) {
  if ($(id).attr("hidden")) $(id).removeAttr("hidden");
  else $(id).attr("hidden", true);
}

$("#roundrobin_switch").on("change", () => {
  if ($("#roundrobin_switch").prop("checked") === false) {
    $("#show_time_quanta").hide();
  }
  if ($("#roundrobin_switch").prop("checked") === true) {
    $("#show_time_quanta").show();
  }
});
$("#vis_stop").on("click", () => {
  stop_flag = true;
});
