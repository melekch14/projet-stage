$(document).ready(function () {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html';
    }

    var table = $('#appel_offre_table').DataTable({
        "ajax": {
            "url": "/api/appel-offre/getAll"
        },
        "columns": [
            { "data": "nom" },
            { "data": "num_appel" },
            {
                "data": "date_creation",
                "render": function (data, type, row) {
                    // Format the date using a library like Moment.js
                    var formattedDate = moment(data).format("DD/MM/YYYY");
                    return formattedDate;
                }
            },
            {
                "data": "date_limite",
                "render": function (data, type, row) {
                    // Format the date using a library like Moment.js
                    var formattedDate = moment(data).format("DD/MM/YYYY");
                    return formattedDate;
                }
            },
            { "data": "username" },
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


    $('#appel_offre_table tbody').on('click', '.modify-button', function () {
        var data = table.row($(this).parents('tr')).data();
        // Fill the input fields with the data from the clicked row

        $("#id_appel_offre").val(data.id_appel);
        $("#nom_af").val(data.nom);
        $("#num_af").val(data.num_appel);
        var date_creation = moment(data.date_creation).format("YYYY-MM-DD");
        var date_limite = moment(data.date_limite).format("YYYY-MM-DD");
        $("#date_af").val(date_creation);
        $("#date_lim_af").val(date_limite);
    });

    $('#appel_offre_table tbody').on('click', '.delete-button', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data.id_appel;

        $.ajax({
            url: "/api/appel-offre/delete/" + id,
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
        $("#id_appel_offre").val("0");
        $("#nom_af").val("");
        $("#num_af").val("");
        $("#date_af").val("");
        $("#date_lim_af").val("");
    });

    $("#save_appel_offre").click(function () {
        var idAppelOffre = $("#id_appel_offre").val();
        var nom_af = $("#nom_af").val();
        var num_af = $("#num_af").val();
        var date_af = $("#date_af").val();
        var date_lim_af = $("#date_lim_af").val();


        var url = "";
        var method = "";

        if (idAppelOffre === "0") {
            method = "POST";
            url = "/api/appel-offre/create";
        } else {
            url = "/api/appel-offre/update/" + idAppelOffre;
            method = "PUT";
        }

        $.ajax({
            url: url,
            method: method,
            data: { nom: nom_af, num_appel: num_af, date_creation: date_af, date_limite: date_lim_af, id_resp: 1 },
            success: function (response) {
                console.log(response);
                $("#id_appel_offre").val("0");
                $("#nom_af").val("");
                $("#num_af").val("");
                $("#date_af").val("");
                $("#date_lim_af").val("");
                table.ajax.reload(null, false);
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });
});
