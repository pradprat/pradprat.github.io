document.addEventListener('DOMContentLoaded',function () 
{
    var elms = document.querySelector('.sidenav');
    M.Sidenav.init(elms);
    instance = M.Sidenav.getInstance(elms);
    loadNav();

    var hash = window.location.hash.substring(1);
    if (hash!='') 
    {
        loadPage(hash);
        
    }
    else
    {
        loadPage('design');
    }

    function loadNav() 
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () 
        {
            if (this.readyState == 4) //Operation Complete (DONE)
            {
                if (isStatusOK(this.status)) 
                {
                    document.querySelector('.sidenav').innerHTML += xhttp.responseText;
                    document.querySelector('.topnav').innerHTML = xhttp.responseText;

                    document.querySelectorAll('.sidenav a').forEach(function (elm) 
                    {
                        elm.addEventListener('click',function (event) 
                        {
                            instance.close();

                            var page = event.target.getAttribute('href').substr(1);
                            loadPage(page);

                        });
                    });

                    document.querySelectorAll('.topnav a').forEach(function(elm)
                    {
                        elm.addEventListener('click',function (event) 
                        {
                            var page = event.target.getAttribute('href').substr(1);
                            loadPage(page);
                        });
                    });
                }
                else
                {
                    return;                    
                }
            }
        }
        xhttp.open('GET','../nav.html',true);
        xhttp.send();
    }

    function isStatusOK(status) 
    {
        if (status == 200) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function loadPage(page) {
        var content = document.querySelector('#body-content');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () 
        {
            if (this.readyState == 4) //Operation Complete (DONE)
            {
                if (isStatusOK(this.status)) 
                {
                    content.innerHTML = xhttp.responseText;
                }
                else if (this.status == 404)
                {
                    content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
                } 
                else
                {
                    content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
                }
            }
        }
        if (page!='') {
            xhttp.open('GET','../pages/'+page+'.html',true);
            xhttp.send();
        }
    }
});