$(document).ready(function () {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html';
    }

    var table = $('#lots_table').DataTable({
        "ajax": {
            "url": "/api/lot/get-All"
        },
        "columns": [
            { "data": "lott" },
            { "data": "nom" },
            { "data": "surface" },
            { "data": "vocation" },
            { "data": "description" },
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

    // Load the lotissements for the dropdown list
    $.ajax({
        url: "/api/lotissemnts/getAll",
        method: "GET",
        success: function (response) {
            response = response.data
            if (response && response.length > 0) {
                var options = '';
                response.forEach(function (lotissement) {
                    options += '<option value="' + lotissement.id_lots + '">' + lotissement.nom + '</option>';
                });
                $('#lotissement_select').html(options);
            }
        },
        error: function (error) {
            console.log(error);
            // Handle error
        }
    });

    $('#lots_table tbody').on('click', '.modify-button', function () {
        var data = table.row($(this).parents('tr')).data();
        // Fill the input fields with the data from the clicked row
        $("#lotissement_select").val(data.id_lots);
        $("#lot_nom").val(data.nom);
        $("#description").val(data.description);
        $("#surface").val(data.surface);
        $("#vocation").val(data.vocation);
        $("#id_lot").val(data.id_lot);
    });

    $('#lots_table tbody').on('click', '.delete-button', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data.id_lot;

        $.ajax({
            url: "/api/lot/delete/" + id,
            method: "DELETE",
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
        $("#lotissement_select").val("");
        $("#lot_nom").val("");
        $("#description").val("");
        $("#surface").val("");
        $("#vocation").val("");
        $("#id_lot").val("0");
    });

    $("#save_lot").click(function () {
        var lotissementId = $("#lotissement_select").val();
        var nomLot = $("#lot_nom").val();
        var idLot = $("#id_lot").val();
        var surface = $("#surface").val();
        var vocation = $("#vocation").val();
        var description = $("#description").val();
        var url = "";
        var method = "";

        if (idLot === "0") {
            method = "POST";
            url = "/api/lot/create";
        } else {
            url = "/api/lot/update/" + idLot;
            method = "PUT";
        }

        $.ajax({
            url: url,
            method: method,
            data: { description: description, surface: surface, vocation: vocation, nom: nomLot, lott: lotissementId, },
            success: function (response) {
                console.log(response);
                $("#lotissement_select").val("");
                $("#lot_nom").val("");
                $("#description").val("");
                $("#surface").val("");
                $("#vocation").val("");
                $("#id_lot").val("0");
                table.ajax.reload(null, false);
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });
});
