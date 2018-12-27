document.addEventListener("DOMContentLoaded",function() {

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {  
            if (this.readyState == 4) {
                if (this.status != 200) {
                    return;
                }
                document.querySelectorAll(".topnav",".sidenav").forEach(function (elm) {  
                    elm.innerHTML = xhttp.responseText;
                });
            }
        };
        xhttp.open("GET","nav.html",true);
        xhttp.send();
        
    }
    
});