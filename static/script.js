
// Previous and Next buttons event listeners
$('#prev').on('click', function() {
    window.location.replace($('#prev').data('prev'));
});

$('#next').on('click', function() {
    window.location.replace($('#next').data('next'));
});


// Modal creation - show residents of planet
function createModal () {

    var linksOfResidents = $(event.target).data('residents');
    linksOfResidents = linksOfResidents.replace(/\[(.*?)\]/g,"$1");
    linksOfResidents = linksOfResidents.replace(/'/g, '');
    linksOfResidents = linksOfResidents.split(', ');

    var modal = $('#modal');
    var modalContent = $('#modal-content');
    var table = $('<table></table>');

    var residents = new Array;
    for (let i = 0; i < linksOfResidents.length; i++) {
        $.ajax({
            dataType: "json",
            url: linksOfResidents[i],
            async: false,
            success: function(response) {
                residents.push({
                    name: response.name,
                    height: response.height,
                    mass: response.mass,
                    hair_color: response.hair_color,
                    skin_color: response.skin_color,
                    eye_color: response.eye_color,
                    birth_year: response.birth_year,
                    gender: response.gender
                });
            }
        });
    }

    for (let i = 0; i < residents.length; i++) {
        var name = $('<td>' + residents[i].name + '</td>');
        var height = $('<td>' + residents[i].height + '</td>');
        var mass = $('<td>' + residents[i].mass + '</td>');
        var hairColor = $('<td>' + residents[i].hair_color + '</td>');
        var skinColor = $('<td>' + residents[i].skin_color + '</td>');
        var eyeColor = $('<td>' + residents[i].eye_color + '</td>');
        var birthYear = $('<td>' + residents[i].birth_year + '</td>');
        var gender = $('<td>' + residents[i].gender + '</td>');

        var row = $('<tr></tr>');
        row.append(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
        table.append(row);
        modalContent.append(table);
    }

    modal.show();
}


// Modal creation event listeners
$('.residents').on('click', createModal);
