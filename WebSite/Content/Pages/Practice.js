
$(document).ready(function () {
    GetPracticeList();
});
var save = function () {

    debugger

    $formData = new FormData();

    var Image = document.getElementById('Photo');

    if (Image.files.length > 0) {

        for (var i = 0; i < Image.files.length; i++) {
            $formData.append('Photo-' + i, Image.files[i]);
        }
    }

    var Id = $("#hdId").val();
    var name = $("#txtname").val();
    var Phone = $("#txtPhone").val();
    var Photo = $("#Photo").val();

    $formData.append('Id', Id);
    $formData.append('name', name);
    $formData.append('Phone', Phone);
    $formData.append('Photo', Photo);

    $.ajax({
        url: "/Practice/SavePhoto",
        method: "Post",
        data: $formData,
        //contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        async: false,

        success: function (response) {
            location.reload();
            alert(response.Message);
        }
    });
}



var GetPracticeList = function () {
    debugger;

    $.ajax({
        url: "/Practice/GetPracticeList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblPractice tbody").empty();
            //$.each(response.model, function (index, elementValue) {
            //    html += "<tr><td>" + elementValue.Id +
            //        "</td><td>" + elementValue.name +
            //        "</td><td>" + elementValue.Phone +
            //        "</td><td><img src ='../Content/Img/" + elementValue.Photo + "'style='max-width:100px;max-height:80px;'/>" +
            //        "</td><td><button class='btn btn-danger btn-sm' onclick='DeletePractice(" + elementValue.Id + ")'>Delete</button></td><td><button class='btn btn-primary btn-sm' onclick='EditPractice(" + elementValue.Id + ")'>Edit</button></td><td><button class='btn btn-info btn-sm' onclick='DetailPractice(" + elementValue.Id + ")'>Details</button></td></tr>;"

            //});

            $.each(response.model, function (index, elementValue) {
                html += "<tr><td>" + elementValue.Id +
                    "</td><td>" + elementValue.name +
                    "</td><td>" + elementValue.Phone +
                    "</td><td><img src ='../Content/Img/" + elementValue.Photo + "' style='max-width:100px;max-height:80px;'/>" +
                    "</td><td><button class='btn btn-danger btn-sm' onclick='DeletePractice(" + elementValue.Id + ")'><i class='bi bi-trash'></i></button></td><td><button class='btn btn-primary btn-sm' onclick='EditPractice(" + elementValue.Id + ")'><i class='bi bi-pencil'></i></button></td><td><button class='btn btn-info btn-sm' onclick='DetailPractice(" + elementValue.Id + ")'><i class='bi bi-info-circle'></i></button></td></tr>";
            });


            $("#tblPractice tbody").append(html);
        }
    });
};

var DeletePractice = function (Id) {
    debugger

    model = { Id: Id }

    $.ajax({
        url: "/Practice/DeletePractice",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (response) {
            alert(response.model);
        }
    });
}

var EditPractice = function (Id) {
    debugger
    var model = { Id: Id };

    $.ajax({
        url: "/Practice/EditPractice",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,

        success: function (response) {

            $("#hdId").val(response.model.Id);
            $("#txtname").val(response.model.name);
            $("#txtPhone").val(response.model.Phone);
            $("#imgPhoto").attr("src", "/Content/Img/" + response.model.Photo);
        }

    });
}


var DetailPractice = function (Id) {
    window.location.href = "/Practice/PracticeDetail?Id=" + Id;
}
