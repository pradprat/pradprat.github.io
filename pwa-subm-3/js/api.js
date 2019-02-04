const API_TOKEN = '19a919608a1e40d6983802317a21b56a';
const url = 'https://api.football-data.org/v2/competitions';
var list_competitions = [2001,2002,2003,2014,2015,2016,2017,2018];
const monthName = [
    'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'
];

function getMatchAPI(){
    document.querySelector('#matchTab').removeAttribute('onclick');
    list_competitions.forEach(id => 
    {  
        getMatches(id);
    });
    updateCards();
}

function getTeamAPI() 
{  
    getCompetitions();
}

function getMatches(idComp) 
{
    document.querySelector('#loading_screen').classList.add('visible');
    fetch(url+'/'+idComp+'/matches?status=SCHEDULED',{
        headers: { 'X-Auth-Token': API_TOKEN },
        dataType: 'json',
        type: 'GET',  
    })
    .then(function(response) 
    { 
        return response.json();
    })
    .then(function(data) 
    {
        var matches = data.matches;
        matches.forEach(match => {
            var matchDate = new Date(match.utcDate);
            var matchMonth = matchDate.getMonth();
            var myDate = new Date();
            var myMonth = myDate.getMonth();
            if (matchMonth <= (myMonth+1)) 
            {
                // console.log(match.id);
                var matchHTML =`
                    <div class="matchCard col s12 m6" compID="${data.competition.id}" matchID="${match.id}" hidden>
                        <div class="card blue-grey darken-1 small">
                            <div class="card-content white-text">
                                <p>${data.competition.name}</p>
                                <span class="card-title"><strong>Home :</strong> ${match.awayTeam.name}</span>
                                <span class="card-title"><strong>Away :</strong> ${match.homeTeam.name}</span>
                                <p>${matchDate.getDate()} ${monthName[matchMonth]} ${matchDate.getFullYear()}</p>
                                <span class="card-title">${matchDate.toLocaleTimeString()}</span>
                            </div>
                            <div class="card-action">
                                <a id="remindBtn" class="pointer" matchID="${match.id}" onclick="setMatchDB('${match.id}')">Remind Me</a>
                            </div>
                        </div>
                    </div>
                `
                document.querySelector('#matches').innerHTML += matchHTML;
            }
        });

        if (matches.length>0) 
        {
            var competitionHTML = `
                <option value="${data.competition.id}">${data.competition.name}</option>
            `;
            document.querySelector('.selectComp').innerHTML += competitionHTML;
            $('select').formSelect();
        }
        document.querySelector('#loading_screen').classList.remove('visible');

    });
}

function getCompetitions() 
{  
    document.querySelector('#loading_screen').classList.add('visible');
    fetch(url,{
        headers: { 'X-Auth-Token': API_TOKEN },
        dataType: 'json',
        type: 'GET',  
    })
    .then(function(response) 
    { 

        return response.json();
    })
    .then(function(data) {

        var competitions = data.competitions;
        competitions.forEach(element => 
        {
            if (list_competitions.includes(element.id)) 
            {
                var competitionHTML = `
                    <li compId="${element.id}">
                        <div class="collapsible-header"><span class="comp-header">${element.name}</span></div>
                        <div id="comp-team-list" class="collapsible-body">
                            <div id="teams" class="row" compID="${element.id}">
                                Request Blocked
                            </div>
                        </div>
                    </li>
                `;
                document.querySelector('#comp-list').innerHTML += competitionHTML;

                // menambahkan daftar team pada setiap competition
                getTeamsFromComp(element.id);
            }
        });
        document.querySelector('#loading_screen').classList.remove('visible');

        
    });
}

function getTeamsFromComp(id)
{
    fetch(url+"/"+id+"/teams",{
        headers: { 'X-Auth-Token': API_TOKEN },
        dataType: 'json',
        type: 'GET',  
    })
    .then(function(response) 
    {
        return response.json();
    })
    .then(function(data) 
    {  
        var teams = data.teams;
        var teamsHTML = '';
        teams.forEach(element => 
        {
            var teamHTML = `
                <div class="col s6 m3 l2">
                    <div class="card small">
                        <img class="team-img" src="${element.crestUrl}">
                        <div class="card-content">
                            <span class="card-title">${element.name}</span>
                            <p>${element.address}</p>
                        </div>
                    </div>
                </div>
            `;
            teamsHTML+=teamHTML;
        });
        // mencari div competition yang cocok dengan id yang di passing
        var teams = document.querySelectorAll('#teams');
        teams.forEach(team => {
            var compID = team.getAttribute('compID');
            if (compID==id) 
            {
                team.innerHTML = teamsHTML;
            }
        });
    });
}