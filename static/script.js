
// Globals
var modal = $('#modal');
var modalContent = $('#modal-content');


// Pagination Event Listeners
$('#pagination').on('click', function(event) {
    if ($(event.target).hasClass('active')){
        window.location.replace($(event.target).data('page'));
    }
})


// Modal creation - show residents of planet
function showResidents () {

    var clickedPlanetName = $(event.target).data('planet-name');
    modalContent.append($(`<h2>Residents of ${clickedPlanetName}</h2>`));

    var table = $('<table></table>');
    table.append(`
        <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Gender</th>
        </tr>
        <tr class="loading-table">
            <td colspan="8">Table content is loading...</td>
        </tr>
        <tr class="loading-table">
            <td colspan="8"><img src="/static/loading.gif" alt="loading"></td>
        </tr>
    `);
    modalContent.append(table);
    modal.show();

    // Get URLs for residents of selected planet
    var linksOfResidents = $(event.target).data('residents');
    linksOfResidents = linksOfResidents.replace(/\[(.*?)\]/g,"$1");
    linksOfResidents = linksOfResidents.replace(/'/g, '');
    linksOfResidents = linksOfResidents.replace(/http/g , "https");
    linksOfResidents = linksOfResidents.split(', ');

    var deferredObjects = new Array();
    var residentRows = new Array();

    for (let i = 0; i < linksOfResidents.length; i++) {
        deferredObjects.push(
            $.ajax({
                dataType: "json",
                url: linksOfResidents[i],
                success: function(response) {
                    residentRows.push(`
                        <tr>
                            <td>${response.name}</td>
                            <td>${response.height !== 'unknown' ? response.height / 100 + 'm' : response.height}</td>
                            <td>${response.mass}${response.mass !== 'unknown' ? 'kg' : ''}</td>
                            <td>${response.hair_color}</td>
                            <td>${response.skin_color}</td>
                            <td>${response.eye_color}</td>
                            <td>${response.birth_year}</td>
                            <td>${response.gender}</td>
                        </tr>
                    `);
                }
            })
        );
    }

    $.when.apply($, deferredObjects).done(function() {
        $('.loading-table').remove();
        table.append(residentRows);
    });
}

$('.residents').on('click', showResidents);


// Modal Closing Event Listeners
$('.close').on('click', function() {
    $('#modal-content table').remove();
    $('#modal-content h2').remove();
    $('#modal').hide();
});

$(window).on('click', function(event) {
    if ($(event.target).attr('id') === 'modal') {
        $('#modal-content table').remove();
        $('#modal-content h2').remove();
        $('#modal').hide();
    }
})


// Voting Functionality
function votePlanet () {

    var clicked = $(event.target);
    var planetName = clicked.data('planet-name');

    $.ajax({
        url: '/api/manage-vote',
        data: {
            planet_name: planetName
        },
        dataType: 'json',
        method: 'POST',
        success: function(response) {
            console.log(response);
            clicked.toggleClass('voted');
        },
        error: function(error) {
            console.log(error);
        }
    });
}

$('.vote-btn').on('click', votePlanet);


// Show Vote Statistics
function showVoteStats () {

    modalContent.append($('<h2>Vote Statistics</h2>'))
    var table = $('<table></table>');

    table.append(`
        <tr>
            <th>Planet Name</th>
            <th>Vote Count</th>
        </tr>
        <tr class="loading-table">
            <td colspan="8">Table content is loading...</td>
        </tr>
        <tr class="loading-table">
            <td colspan="8"><img src="/static/loading.gif" alt="loading"></td>
        </tr>
    `);
    modalContent.append(table);
    modal.show();

    voteRows = new Array();

    $.ajax({
        url: '/api/vote-statistics',
        dataType: 'json',
        success: function(response) {
            for (let i = 0; i < response.vote_stats.length; i++) {
                voteRows.push(`
                    <tr>
                        <td>${response.vote_stats[i][0]}</td>
                        <td>${response.vote_stats[i][1]}</td>
                    </tr>
                `);
            }

            $('.loading-table').remove();
            table.append(voteRows);
        }
    });
}

$('#stats-menu').on('click', showVoteStats);
