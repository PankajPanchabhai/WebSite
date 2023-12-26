

$(document).ready(function () {
    DetailPractice();
});

//var DetailPractice = function (Id) {

//    debugger

//    var Id = $("#hdId").val();

//    model = { Id: Id };


//    $.ajax({

//        url: "/Practice/EditPractice",
//        method: "post",
//        data: JSON.stringify(model),
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",

//        async: false,
//        success: function (response) {

//            var html = "";




//            html += "<label> Id: <span >" + response.model.Id + "</span></label></br></br>" +


//                "<label>name :  <span>" + response.model.name + "</span></label></br></br>" +

//                "<label>Phone  : <span>" + response.model.phone + "</span></label></br></br>" +


//                "<label>Photo  : <img src='../Content/Img/" + response.model.Photo + "'style='max-width:150px;max-height:100px;'/></label></br></br>";

//            $("#tblDetails").html(html);

//        }
//    });
//}


var DetailPractice = function (Id) {
    var Id = $("#hdId").val();
    model = { Id: Id };

    $.ajax({
        url: "/Practice/EditPractice",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "<label> Id: <span >" + response.model.Id + "</span></label></br></br>" +
                "<label>name :  <span>" + response.model.name + "</span></label></br></br>" +
                "<label>Phone  : <span>" + response.model.phone + "</span></label></br></br>" +
                "<label>Photo  : <img src='../Content/Img/" + response.model.Photo + "' style='max-width:150px; max-height:100px;'/></label></br></br>";

            // Set the content inside the modal
            $("#modalContent").html(html);

            // Show the modal
            $("#practiceModal").modal('show');
        }
    });
};