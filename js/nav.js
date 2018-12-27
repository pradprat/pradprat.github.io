document.addEventListener('DOMContentLoaded',function() 
{

    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    // Load Navbar
    function loadNav() 
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () 
        {  
            if (this.readyState == 4) 
            {
                if (this.status != 200) //Fail
                {
                    return;
                }
                else
                {
                    document.querySelector('.sidenav').innerHTML = xhttp.responseText;

                    document.querySelector('.topnav').innerHTML = xhttp.responseText;

                    document.querySelectorAll('.sidenav a').forEach(function(elm)
                    {
                        elm.addEventListener('click',function (event) 
                        {
                            var sidenav = document.querySelector('.sidenav');
                            M.Sidenav.getInstance(sidenav).close();

                            page = event.target.getAttribute('href').substr(1);
                            loadPage(page);
                        });
                    });

                    document.querySelectorAll('.topnav a').forEach(function(elm)
                    {
                        elm.addEventListener('click',function (event) 
                        {
                            page = event.target.getAttribute('href').substr(1);
                            loadPage(page);
                        });
                    });
                }
            }
        };

        xhttp.open('GET','../html/nav.html',true);
        xhttp.send();
        
    }

    var page = window.location.hash.substr(1);
    if (page == '')
    {
        page = 'home';
    }
    loadPage(page);

    function loadPage(page) 
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () 
        {
            if (this.readyState == 4)
            {
                var content = document.querySelector('#body-content');
                if (this.status == 200)
                {
                    content.innerHTML = xhttp.responseText;
                } 
                else if (this.status == 404)
                {
                    content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
                } 
                else
                {
                    content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>'
                }
            }
        };
        xhttp.open('GET','../pages/' + page + '.html',true);
        xhttp.send();
    }
    
});