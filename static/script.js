
// Pagination Event Listeners
$('#pagination').on('click', function(event) {
    window.location.replace($(event.target).data('page'));
})


// Modal creation - show residents of planet
function createModal () {

    var linksOfResidents = $(event.target).data('residents');
    var clickedPlanetName = $(event.target).data('planet-name');
    linksOfResidents = linksOfResidents.replace(/\[(.*?)\]/g,"$1");
    linksOfResidents = linksOfResidents.replace(/'/g, '');
    linksOfResidents = linksOfResidents.split(', ');

    var modal = $('#modal');
    var modalContent = $('#modal-content');
    modalContent.append($('<h2>Residents of ' + clickedPlanetName + '</h2>'))
    
    var table = $('<table></table>');

    var nameTitle = $('<th>Name</th>');
    var heightTitle = $('<th>Height</th>');
    var massTitle = $('<th>Mass</th>');
    var hairColorTitle = $('<th>Hair Color</th>');
    var skinColorTitle = $('<th>Skin Color</th>');
    var eyeColorTitle = $('<th>Eye Color</th>');
    var birthYearTitle = $('<th>Birth Year</th>');
    var genderTitle = $('<th>Gender</th>');

    var rowTitle = $('<tr></tr>');
    rowTitle.append(nameTitle, heightTitle, massTitle, hairColorTitle,
                    skinColorTitle, eyeColorTitle, birthYearTitle, genderTitle);
    table.append(rowTitle);

    var residents = new Array;
    for (let i = 0; i < linksOfResidents.length; i++) {
        $.ajax({
            dataType: "json",
            url: linksOfResidents[i],
            success: function(response) {

                var name = $('<td>' + response.name + '</td>');
                var height = $('<td>' + response.height + '</td>');
                var mass = $('<td>' + response.mass + '</td>');
                var hairColor = $('<td>' + response.hair_color + '</td>');
                var skinColor = $('<td>' + response.skin_color + '</td>');
                var eyeColor = $('<td>' + response.eye_color + '</td>');
                var birthYear = $('<td>' + response.birth_year + '</td>');
                var gender = $('<td>' + response.gender + '</td>');

                var row = $('<tr></tr>');
                row.append(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
                table.append(row);
                modalContent.append(table);
            }
        });
    }

    modal.show();
}


// Modal creation event listeners
$('.residents').on('click', createModal);


// Modal close event listener
$('.close').on('click', function() {
    $('#modal').hide();
    $('#modal-content h2').remove();
    $('#modal-content table').remove();
});

$(window).on('click', function(event) {
    if ($(event.target).attr('id') === 'modal') {
        $('#modal').hide();
        $('#modal-content h2').remove();
        $('#modal-content table').remove();
    }
})


// Voting functionality
function votePlanet () {

    var clicked = $(event.target);
    var planetName = clicked.data('planet-name');

    $.ajax({
        url: '/api/manage-vote',
        data: {
            planet_name: planetName
        },
        method: 'POST',
        success: function(response) {
            console.log(JSON.parse(response));
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

    var modal = $('#modal');
    var modalContent = $('#modal-content');
    modalContent.append($('<h2>Vote Statistics</h2>'))
    var table = $('<table></table>');

    var planetNameTitle = $('<th>Planet Name</th>');
    var voteCountTitle = $('<th>Vote Count</th>');

    var rowTitle = $('<tr></tr>');
    rowTitle.append(planetNameTitle, voteCountTitle);
    table.append(rowTitle);

    $.ajax({
        url: '/api/vote-statistics',
        dataType: 'json',
        success: function(response) {
            for (let i = 0; i < response.vote_stats.length; i++) {
                var planetName = $('<td>' + response.vote_stats[i][0] + '</td>');
                var voteCount = $('<td>' + response.vote_stats[i][1] + '</td>');
                var row = $('<tr></tr>');
                row.append(planetName, voteCount);
                table.append(row);
                modalContent.append(table);
            }
        }
    });

    modal.show();
}

$('#stats-menu').on('click', showVoteStats);
