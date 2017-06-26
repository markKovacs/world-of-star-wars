
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
    $('#modal-content table').remove();
});
