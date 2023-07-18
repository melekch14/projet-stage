$(document).ready(function () {
  // Retrieve the token from local storage
  var token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login.html';
  }

  var table = $('#lotissement_table').DataTable({
    "ajax": {
      "url": "/api/lotissemnts/getAll"
    },
    "columns": [
      { "data": "nom" },
      { "data": "description" },
      { "data": "location" },
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

  $('#lotissement_table tbody').on('click', '.modify-button', function () {
    var data = table.row($(this).parents('tr')).data();
    // Fill the input fields with the data from the clicked row
    $("#lotissement_nom").val(data.nom);
    $("#lotissement_location").val(data.description);
    $("#lotissement_description").val(data.location);
    $("#id_lots").val(data.id_lots);
  });


  $('#lotissement_table tbody').on('click', '.delete-button', function () {
    var data = table.row($(this).parents('tr')).data();
    var id = data.id_lots;

    $.ajax({
      url: "/api/lotissemnts/delete/"+id,
      method: "delete",
      success: function (response) {
        console.log(response);
        table.ajax.reload(null, false);
      },
      error: function (error) {
        console.log(error);
        // Handle login error
      }
    });
  });

  $("#clear").click(function() {
    $("#lotissement_nom").val("");
    $("#lotissement_location").val("");
    $("#lotissement_description").val("");
    $("#id_lots").val("0");
  });

  $("#save_lotissement").click(function () {

    var nom_lotissement = $("#lotissement_nom").val();
    var location_lotissement = $("#lotissement_location").val();
    var description_lotissement = $("#lotissement_description").val();

    var id_lots = $("#id_lots").val();
    var url = "";
    var method = "";
    if (id_lots == 0) {
      method="POST";
      url = "/api/lotissemnts/create";
    } else {
      url = "/api/lotissemnts/update/" + id_lots;
      method="PUT";
    }


    $.ajax({
      url: url,
      method: method,
      data: { nom: nom_lotissement, description: description_lotissement, location: location_lotissement },
      success: function (response) {
        console.log(response);
        $("#lotissement_nom").val("");
        $("#lotissement_location").val("");
        $("#lotissement_description").val("");
        table.ajax.reload(null, false);
      },
      error: function (error) {
        console.log(error);
        // Handle login error
      }
    });

  });

});