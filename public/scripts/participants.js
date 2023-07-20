$(document).ready(function () {
  // Retrieve the token from local storage
  var token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login.html';
  }

  var table = $('#participants_table').DataTable({
    "ajax": {
      "url": "/api/participant/getAll"
    },
    "columns": [
      { "data": "code_participant" },
      { "data": "nom" },
      {
        "data": null,
        "render": function (data, type, row) {
          return '<button type="button" class="btn btn-primary btn-sm modify-button">Modifier</button>';
        }
      },
      {
        "data": null,
        "render": function (data, type, row) {
          return '<button type="button" class="btn btn-danger btn-sm delete-button">Supprimer</button>';
        }
      }
    ],
    'paging': true,
    'lengthChange': true,
    'searching': true,
    'ordering': false,
    'info': true,
    'autoWidth': false,
    'responsive': true
  });

  $('#participants_table tbody').on('click', '.modify-button', function () {
    var data = table.row($(this).parents('tr')).data();
    // Fill the input fields with the data from the clicked row
    $("#code_participant").val(data.code_participant);
    $("#participant_nom").val(data.nom);
    $("#id_participant").val(data.id_participant);
  });

  $('#participants_table tbody').on('click', '.delete-button', function () {
    var data = table.row($(this).parents('tr')).data();
    var id = data.id_participant;

    $.ajax({
      url: "/api/participant/delete/" + id,
      method: "delete",
      success: function (response) {
        console.log(response);
        table.ajax.reload(null, false);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  });

  $("#clear").click(function () {
    $("#code_participant").val("");
    $("#participant_nom").val("");
    $("#id_participant").val("0");
  });

  $("#save_participant").click(function () {
    var code_participant = $("#code_participant").val();
    var nom_participant = $("#participant_nom").val();
    var id_participant = $("#id_participant").val();
    var url = "";
    var method = "";

    if (id_participant == 0) {
      method = "POST";
      url = "/api/participant/create";
    } else {
      url = "/api/participant/update/" + id_participant;
      method = "PUT";
    }

    $.ajax({
      url: url,
      method: method,
      data: { code_participant: code_participant, nom: nom_participant },
      success: function (response) {
        console.log(response);
        $("#code_participant").val("");
        $("#participant_nom").val("");
        $("#id_participant").val("0");
        table.ajax.reload(null, false);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  });
});
