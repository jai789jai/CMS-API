// -----------------------------------LOGIN.html------------------------------------------------------
function login(){
    $("#login").click(function(e){
        e.preventDefault();
        $.ajax({
            url: "https://localhost:5001/api/User/Login",
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "post",
            contentType: "application/Json",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                name: "null",
                password: document.getElementById("password").value,
                phone: "null",
                type: "null"
            }),
            success: function (result, status, xhr) {
                if(status=="success")
                {
                  sessionStorage.setItem("email",result.email);
                  sessionStorage.setItem("type",result.type);
                  sessionStorage.setItem("name",result.name);
                  sessionStorage.setItem("phone",result.phone);
                  sessionStorage.setItem("password",result.password);
                  sessionStorage.setItem("dashboard", "1");
                  window.location.href="Home.html"
                }
            },
            error: function(xhr, status, error) {
                var str = "";
                switch(xhr.status){
                    case 401:
                        {
                        str = "Wrong Password";
                        break;}
                    case 404:
                        {
                        str = "Email Not Found";
                        break;}
                }
                $("#lgn").append($("<div class='alert alert-warning alert-dismissible fade show' role='alert'>").html("<strong>ERROR:</strong>" + str + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"));
            }
        });
    });
}
// -----------------------------------DashBoard.html---------------------------------------------------
function DashBar(){
    if(sessionStorage["type"]=="admin")
    {
        $("#lecturer").hide();
        $("#student").hide();
    }
    else if(sessionStorage["type"]=="lecturer")
    {
        $("#admin").hide();
        $("#student").hide();
    }
    else if(sessionStorage["type"]=="student")
    {
        $("#admin").hide();
        $("#lecturer").hide();
    }
}
function Load(str)
{
    $("#data").load(str);
}
// -----------------------------------UserDetails.html------------------------------------------------
function User(){
    $("h5").text(sessionStorage["name"]);
    $("#type").text(sessionStorage["type"]);
    $("#password").text(sessionStorage["password"]);
    $("#email").text(sessionStorage["email"]);
    $("#phone").text(sessionStorage["phone"]);
}
// -----------------------------------AllUsers.html-----------------------------------------------------
function ShowAllUsers(){
    $("table tbody").html("");
    $.ajax({
        url: "https://localhost:5001/api/User",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $.each(result,function(index, value){
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>"));
                appendTD = $("tbody tr td").last();
                appendTD.append($("<div class='d-flex align-items-center' id='div1'>"));
                appendDiv = $("tbody tr td div").last();
                appendDiv.append($("<img src='images/profile.png' style='width: 45px; height: 45px' class='rounded-circle'>"));
                appendDiv.append($("<div class='ms-3'>").html("<p class='fw-bold mb-0'>"+value['name']+"</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['email']+ "</p>"));
                if(value['type']=="admin")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Admin</span>"));
                else if(value['type']=="lecturer")
                    appendElement.append($("<td>").html("<span class='badge text-bg-primary rounded-pill d-inline'>Lecturer</span>"));
                else if(value['type']=="student")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Student</span>"));
                appendElement.append($("<td>").html(value['password']));
                appendElement.append($("<td>").html(value['phone']));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateUser.html?id="+value["email"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function DeleteUser(){
    $("table").on("click", "button#delete", function () {
        var empid = $(this).parents("tr").find("td:nth-child(2)").text();
        $.ajax({
            url: "https://localhost:5001/api/User/" + empid,
            type: "delete",
            contentType: "application/json",
            success: function (result, status, xhr) {
                ShowAllUsers();
            },
            error: function (xhr, status, error) {
                console.log(xhr)
            }
           });
        });
}

function SearchUser(){
    $.ajax({
        url: "https://localhost:5001/api/User/Search/" + document.getElementById("searchbox").value,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            var i = 0;
            $("table tbody").html("");
            $.each(result,function(index, value){
                i=i+1;
               
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>"));
                appendTD = $("tbody tr td").last();
                appendTD.append($("<div class='d-flex align-items-center' id='div1'>"));
                appendDiv = $("tbody tr td div").last();
                appendDiv.append($("<img src='images/profile.png' style='width: 45px; height: 45px' class='rounded-circle'>"));
                appendDiv.append($("<div class='ms-3'>").html("<p class='fw-bold mb-0'>"+value['name']+"</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['email']+ "</p>"));
                if(value['type']=="admin")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Admin</span>"));
                else if(value['type']=="lecturer")
                    appendElement.append($("<td>").html("<span class='badge text-bg-primary rounded-pill d-inline'>Lecturer</span>"));
                else if(value['type']=="student")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Student</span>"));
                appendElement.append($("<td>").html(value['password']));
                appendElement.append($("<td>").html(value['phone']));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateUser.html?id="+value["email"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------AddUsers.html-----------------------------------------------------
function SubmitUser(){
    $("#submit").click(function(e){
        e.preventDefault();
        // alert(getElementById("type").value);
        $.ajax({
            url: "https://localhost:5001/api/User",
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "post",
            contentType: "application/Json",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                name: document.getElementById("name2").value,
                password: document.getElementById("password").value,
                phone: document.getElementById("phone").value,
                type: document.getElementById("type").value
            }),
            success: function (result, status, xhr) {
                if(status=="success")
                {
                  window.location.href="AllUsers.html"
                }
            },
            error: function(xhr, status, error) {
                alert("status");
            }
        });
    });
}
// -----------------------------------UpdateUser.html-----------------------------------------------------
function FillUserForm() {
    let params = (new URL(document.location)).searchParams;
       // alert(params);
    let id = params.get("id");
    $.ajax({
        url: "https://localhost:5001/api/User/" + id,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $("#name2").val(result['name']);
           $("#email").val(result['email']);
           $("#password").val(result['password']);
           $("#phone").val(result['phone']);
           $("#type").val(result['type']);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function UpdateUser(){
    $("#update").click(function(e){
        e.preventDefault();
        let params = (new URL(document.location)).searchParams;
       // alert(params);
        let id = params.get("id");
        $.ajax({
            url: "https://localhost:5001/api/User/" + id,
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "put",
            contentType: "false",
            processData: "false",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                name: document.getElementById("name2").value,
                password: document.getElementById("password").value,
                phone: document.getElementById("phone").value,
                type: document.getElementById("type").value,
            }),
            success: function (result, status, xhr) {
                if(status=="success")
                {
                  window.location.href="AllUsers.html"
                }
            },
            error: function(xhr, status, error) {
                alert(status);
            }
        });
    });
}
// -----------------------------------AdminBooksList.html-----------------------------------------------------
function ShowAdminBooks(){
    $("table tbody").html("");
    $.ajax({
        url: "https://localhost:5001/api/Book",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $.each(result,function(index, value){
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookId']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookName']+ "</p>"));
                appendElement.append($("<td>").html(value['author']));
                if(value['status']=="available")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Available</span>"));
                else if(value['status']=="unavailable")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Unavailable</span>"));
                appendElement.append($("<td>").html(value['issuedTo']));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateBook.html?id="+value["bookId"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function DeleteBook(){
    $("table").on("click", "button#delete", function () {
        var empid = $(this).parents("tr").find("td:nth-child(1)").text();
        $.ajax({
            url: "https://localhost:5001/api/Book/" + empid,
            type: "delete",
            contentType: "application/json",
            success: function (result, status, xhr) {
                ShowAdminBooks();
            },
            error: function (xhr, status, error) {
                console.log(xhr)
            }
           });
        });
}

function SearchBookUser(){
    $.ajax({
        url: "https://localhost:5001/api/Book/Search/" + document.getElementById("searchbox").value,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            var i = 0;
            $("table tbody").html("");
            $.each(result,function(index, value){
                i=i+1;
               
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookId']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookName']+ "</p>"));
                appendElement.append($("<td>").html(value['author']));
                if(value['status']=="available")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Available</span>"));
                else if(value['status']=="unavailable")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Unavailable</span>"));
                appendElement.append($("<td>").html(value['issuedTo']));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateBook.html?id="+value["bookId"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------UpdateBook.html-----------------------------------------------------
function FillBookForm() {
    let params = (new URL(document.location)).searchParams;
       // alert(params);
    let id = params.get("id");
    $.ajax({
        url: "https://localhost:5001/api/Book/" + id,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $("#bookId").val(result['bookId']);
           $("#bookname").val(result['bookName']);
           $("#author").val(result['author']);
           $("#issuedto").val(result['issuedTo']);
           $("#status").val(result['status']);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function UpdateBook(){
    $("#update").click(function(e){
        e.preventDefault();
        let params = (new URL(document.location)).searchParams;
       // alert(params);
        let id = params.get("id");
        $.ajax({
            url: "https://localhost:5001/api/Book/" + id,
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "put",
            contentType: "false",
            processData: "false",
            data: JSON.stringify({
                bookId: document.getElementById("bookId").value,
                bookName: document.getElementById("bookname").value,
                author: document.getElementById("author").value,
                issuedTo: document.getElementById("issuedto").value,
                status: document.getElementById("status").value,
            }),
            success: function (result, status, xhr) {
                window.location.href="AdminBooksList.html"
                
            },
            error: function(xhr, status, error) {
                alert(status);
            }
        });
    });
}
// -----------------------------------AddBook.html-----------------------------------------------------
function SubmitBook(){
    $("#submit").click(function(e){
        e.preventDefault();
        // alert(getElementById("type").value);
        $.ajax({
            url: "https://localhost:5001/api/Book",
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "post",
            contentType: "application/Json",
            data: JSON.stringify({
                bookId: document.getElementById("bookId").value,
                bookName: document.getElementById("bookname").value,
                author: document.getElementById("author").value,
                issuedTo: document.getElementById("issuedto").value,
                status: document.getElementById("status").value,
            }),
            success: function (result, status, xhr) {
                window.location.href="AdminBooksList.html"
            },
            error: function(xhr, status, error) {
                alert("status");
            }
        });
    });
}
// -----------------------------------StudentBookList.html-----------------------------------------------------
function ShowStudentBooks(){
    $("table tbody").html("");
    $.ajax({
        url: "https://localhost:5001/api/Book",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $.each(result,function(index, value){
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookId']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookName']+ "</p>"));
                appendElement.append($("<td>").html(value['author']));
                if(value['status']=="available")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Available</span>"));
                else if(value['status']=="unavailable")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Unavailable</span>"));
                // appendElement.append($("<td>").html(value['issuedTo']));
                // appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateBook.html?id="+value["bookId"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
function SearchBookStudent(){
    $.ajax({
        url: "https://localhost:5001/api/Book/Search/" + document.getElementById("searchbox").value,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            var i = 0;
            $("table tbody").html("");
            $.each(result,function(index, value){
                i=i+1;
               
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookId']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookName']+ "</p>"));
                appendElement.append($("<td>").html(value['author']));
                if(value['status']=="available")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Available</span>"));
                else if(value['status']=="unavailable")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Unavailable</span>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------IssuedBooks.html-----------------------------------------------------
function IssuedBooks(){
    $("table tbody").html("");
    $.ajax({
        url: "https://localhost:5001/api/Book",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            var str = sessionStorage["email"];
            // var str = "student@gmail.com";
            $.each(result,function(index, value){
                if(value['issuedTo']!=str)
                    return ;
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookId']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['bookName']+ "</p>"));
                appendElement.append($("<td>").html(value['author']));
                if(value['status']=="available")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>Available</span>"));
                else if(value['status']=="unavailable")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>Unavailable</span>"));
                // appendElement.append($("<td>").html(value['issuedTo']));
                // appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateBook.html?id="+value["bookId"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------LecturerStudentList.html-----------------------------------------------------
function ShowAllStudents(){
    $("table tbody").html("");
    $.ajax({
        url: "https://localhost:5001/api/Student",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $.each(result,function(index, value){
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>"));
                appendTD = $("tbody tr td").last();
                appendTD.append($("<div class='d-flex align-items-center' id='div1'>"));
                appendDiv = $("tbody tr td div").last();
                appendDiv.append($("<img src='images/profile.png' style='width: 45px; height: 45px' class='rounded-circle'>"));
                appendDiv.append($("<div class='ms-3'>").html("<p class='fw-bold mb-0'>"+value['name']+"</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['email']+ "</p>"));
                if(value['department']=="CSE")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>CSE</span>"));
                else if(value['department']=="ECE")
                    appendElement.append($("<td>").html("<span class='badge text-bg-primary rounded-pill d-inline'>ECE</span>"));
                else if(value['department']=="EEE")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>EEE</span>"));
                appendElement.append($("<td>").html("<a href='DetailsStudent.html?id="+value["email"]+"'>"+"<button type='button' class='btn btn-outline-info'>Details</button></a>"));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateStudent.html?id="+value["email"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function DeleteStudent(){
    $("table").on("click", "button#delete", function () {
        var empid = $(this).parents("tr").find("td:nth-child(2)").text();
        $.ajax({
            url: "https://localhost:5001/api/Student/" + empid,
            type: "delete",
            contentType: "application/json",
            success: function (result, status, xhr) {
                ShowAllStudents();
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
           });
        });
}

function SearchStudent(){
    $.ajax({
        url: "https://localhost:5001/api/Student/Search/" + document.getElementById("searchbox").value,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            var i = 0;
            $("table tbody").html("");
            $.each(result,function(index, value){
                i=i+1;
               
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>"));
                appendTD = $("tbody tr td").last();
                appendTD.append($("<div class='d-flex align-items-center' id='div1'>"));
                appendDiv = $("tbody tr td div").last();
                appendDiv.append($("<img src='images/profile.png' style='width: 45px; height: 45px' class='rounded-circle'>"));
                appendDiv.append($("<div class='ms-3'>").html("<p class='fw-bold mb-0'>"+value['name']+"</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['email']+ "</p>"));
                if(value['department']=="CSE")
                    appendElement.append($("<td>").html("<span class='badge text-bg-success rounded-pill d-inline'>CSE</span>"));
                else if(value['department']=="ECE")
                    appendElement.append($("<td>").html("<span class='badge text-bg-primary rounded-pill d-inline'>ECE</span>"));
                else if(value['department']=="EEE")
                    appendElement.append($("<td>").html("<span class='badge text-bg-secondary rounded-pill d-inline'>EEE</span>"));
                appendElement.append($("<td>").html("<a href='DetailsStudent.html?id="+value["email"]+"'>"+"<button type='button' class='btn btn-outline-info'>Details</button></a>"));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateStudent.html?id="+value["email"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------AddStudent.html-----------------------------------------------------
function SubmitStudent(){
    $("#submit").click(function(e){
        e.preventDefault();
        // alert(getElementById("type").value);
        $.ajax({
            url: "https://localhost:5001/api/Student",
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "post",
            contentType: "application/Json",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                name: document.getElementById("name2").value,
                birthdate: document.getElementById("birthdate").value,
                rollno: document.getElementById("rollno").value,
                degree: document.getElementById("degree").value,
                department: document.getElementById("department").value,
                batch: document.getElementById("batch").value,
                cgpa: document.getElementById("cgpa").value,
                address: document.getElementById("address").value
            }),
            success: function (result, status, xhr) {
                window.location.href="LecturerStudentList.html";
            },
            error: function(xhr, status, error) {
                alert("status");
            }
        });
    });
}


// -----------------------------------UpdateStudent.html-----------------------------------------------------
function FillStudentForm() {
    let params = (new URL(document.location)).searchParams;
       // alert(params);
    let id = params.get("id");
    $.ajax({
        url: "https://localhost:5001/api/Student/" + id,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $("#email").val(result['email']);
           $("#name2").val(result['name']);
           $("#birthdate").val(result['birthdate']);
           $("#rollno").val(result['rollno']);
           $("#degree").val(result['degree']);
           $("#department").val(result['department']);
           $("#batch").val(result['batch']);
           $("#cgpa").val(result['cgpa']);
           $("#address").val(result['address']);
        //    alert(result['birthdate']);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function UpdateStudent(){
    $("#update").click(function(e){
        e.preventDefault();
        let params = (new URL(document.location)).searchParams;
       // alert(params);
        let id = params.get("id");
        $.ajax({
            url: "https://localhost:5001/api/Student/" + id,
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "put",
            contentType: "false",
            processData: "false",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                name: document.getElementById("name2").value,
                birthdate: document.getElementById("birthdate").value,
                rollno: document.getElementById("rollno").value,
                degree: document.getElementById("degree").value,
                department: document.getElementById("department").value,
                batch: document.getElementById("batch").value,
                cgpa: document.getElementById("cgpa").value,
                address: document.getElementById("address").value
            }),
            success: function (result, status, xhr) {
                window.location.href="LecturerStudentList.html"
                
            },
            error: function(xhr, status, error) {
                alert(status);
            }
        });
    });
}
// -----------------------------------DetailsStudent.html-----------------------------------------------------
function StudentDetail(){
    let params = (new URL(document.location)).searchParams;
       // alert(params);
    let id = params.get("id");
    $.ajax({
        url: "https://localhost:5001/api/Student/" + id,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $("#name2").text(result['name']);
            $("#email").text(result['email']);
           $("#rollno").text(result['rollno']);
           $("#birthdate").text(result['birthdate']);
           $("#degree").text(result['degree']);
           $("#department").text(result['department']);
           $("#batch").text(result['batch']);
           $("#cgpa").text(result['cgpa']);
           $("#address").text(result['address']);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------LecturerGradeList.html-----------------------------------------------------
function ShowGrades(){
    $("table tbody").html("");
    $.ajax({
        url: "https://localhost:5001/api/Grade",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $.each(result,function(index, value){
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['email']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['subject']+ "</p>"));
                appendElement.append($("<td>").html(value['grade']));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateGrade.html?id="+value["email"]+"&subject="+value["subject"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function DeleteGrade(){
    $("table").on("click", "button#delete", function () {
        var id = $(this).parents("tr").find("td:nth-child(1)").text();
        var subject = $(this).parents("tr").find("td:nth-child(2)").text();
        $.ajax({
            url: "https://localhost:5001/api/Grade/" + id +"?subject=" + subject,
            type: "delete",
            contentType: "application/json",
            success: function (result, status, xhr) {
                ShowGrades();
            },
            error: function (xhr, status, error) {
                console.log(xhr)
            }
           });
        });
}

function SearchGrade(){
    $.ajax({
        url: "https://localhost:5001/api/Grade/Search/" + document.getElementById("searchbox").value,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            var i = 0;
            $("table tbody").html("");
            $.each(result,function(index, value){
                i=i+1;
               
                $("tbody").append($("<tr>"));
                appendElement = $("tbody tr").last();
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['email']+ "</p>"));
                appendElement.append($("<td>").html("<p class='fw-normal mb-1'>" + value['subject']+ "</p>"));
                appendElement.append($("<td>").html(value['grade']));
                appendElement.append($("<td>").html("<div class='btn-group' role='group' aria-label='Basic mixed styles example'><a href='UpdateGrade.html?id="+value["email"]+"&subject="+value["subject"]+"'>"+"<button type='button' class='btn btn-primary'>Edit</button></a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div>"));
            });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}
// -----------------------------------UpdateGrade.html-----------------------------------------------------
function FillGradeForm() {
    let params = (new URL(document.location)).searchParams;
       // alert(params);
    let id = params.get("id");
    let subject = params.get("subject");
    $.ajax({
        url: "https://localhost:5001/api/Grade/" + id +"?subject=" + subject,
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $("#email").val(result['email']);
           $("#subject").val(result['subject']);
           $("#grade").val(result['grade']);
        //    alert(result['birthdate']);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function UpdateGrade(){
    $("#update").click(function(e){
        e.preventDefault();
        let params = (new URL(document.location)).searchParams;
       // alert(params);
        let id = params.get("id");
        $.ajax({
            url: "https://localhost:5001/api/Grade/" + id,
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "put",
            contentType: "false",
            processData: "false",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                grade: document.getElementById("grade").value
            }),
            success: function (result, status, xhr) {
                window.location.href="LecturerGradeList.html";
                
            },
            error: function(xhr, status, error) {
                alert(status);
            }
        });
    });
}
// -----------------------------------AddGrade.html-----------------------------------------------------
function SubmitGrade(){
    $("#submit").click(function(e){
        e.preventDefault();
        // alert(getElementById("type").value);
        $.ajax({
            url: "https://localhost:5001/api/Grade",
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'*'
            },
            type: "post",
            contentType: "application/Json",
            data: JSON.stringify({
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                grade: document.getElementById("grade").value
            }),
            success: function (result, status, xhr) {
                window.location.href="LecturerGradeList.html";
            },
            error: function(xhr, status, error) {
                alert("status");
            }
        });
    });
}

function fetchStudent(){
    $.ajax({
        url: "https://localhost:5001/api/Student",
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Method':'*'
        },
        type: "get",
        contentType: "application/Json",
        success: function (result, status, xhr) {
            $.each(result,function(index, value){
                var str = value['email'];
                $("#email").append($(`<option value="${str}" type="text">`).html(value['email']));
                });
        },
        error: function(xhr, status, error) {
            console.log(xhr)
        }
    });
}

function DeleteStudent(){
    $("table").on("click", "button#delete", function () {
        var empid = $(this).parents("tr").find("td:nth-child(2)").text();
        $.ajax({
            url: "https://localhost:5001/api/Student/" + empid,
            type: "delete",
            contentType: "application/json",
            success: function (result, status, xhr) {
                ShowAllStudents();
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
           });
        });
}
// -----------------------------------AllUsers.html-----------------------------------------------------