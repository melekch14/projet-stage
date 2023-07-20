$(document).ready(function () {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html';
    }

    var table = $('#vocation_table').DataTable({
        "ajax": {
            "url": "/api/vocation/getAll"
        },
        "columns": [
            { "data": "code_vocation" },
            { "data": "label" },
            { "data": "secteur" },
            { "data": "superficie" },
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

    $('#vocation_table tbody').on('click', '.modify-button', function () {
        var data = table.row($(this).parents('tr')).data();
        // Fill the input fields with the data from the clicked row
        $("#code_vocation").val(data.code_vocation);
        $("#label").val(data.label);
        $("#secteur").val(data.secteur);
        $("#superficie").val(data.superficie);
        $("#id_vocation").val(data.id_vocation);
    });


    $('#vocation_table tbody').on('click', '.delete-button', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data.id_vocation;

        $.ajax({
            url: "/api/vocation/delete/" + id,
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

    $("#clear").click(function () {
        $("#code_vocation").val("");
        $("#label").val("");
        $("#secteur").val("");
        $("#superficie").val("");
        $("#id_vocation").val("0");
    });

    $("#save_vocation").click(function () {

        var code_vocation = $("#code_vocation").val();
        var label = $("#label").val();
        var secteur = $("#secteur").val();
        var superficie = $("#superficie").val();
        alert(superficie);
        var id_vocation = $("#id_vocation").val();
        var url = "";
        var method = "";
        if (id_vocation == 0) {
            method = "POST";
            url = "/api/vocation/create";
        } else {
            url = "/api/vocation/update/" + id_vocation;
            method = "PUT";
        }


        $.ajax({
            url: url,
            method: method,
            data: { code_vocation: code_vocation, label: label, secteur: secteur, superficie: superficie },
            success: function (response) {
                console.log(response);
                $("#code_vocation").val("");
                $("#label").val("");
                $("#secteur").val("");
                $("#superficie").val("");
                $("#id_vocation").val("0");
                table.ajax.reload(null, false);
            },
            error: function (error) {
                console.log(error);
                // Handle login error
            }
        });

    });

});