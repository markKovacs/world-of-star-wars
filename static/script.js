var residents = new Array;

$.ajax({
    dataType: "json",
    url: 'http://swapi.co/api/planets/',
    success: function(response) {
        return response['results'];
    }
});


function directToPreviousPage () {
    window.location.replace($('#prev').data('prev'));
}

function directToNextPage () {
    window.location.replace($('#next').data('next'));
}

$('#prev').on('click', directToPreviousPage);
$('#next').on('click', directToNextPage);




function createModal () {

    var clickedLink = $(event.target);
    var linksOfResidents = clickedLink.data('residents');

    linksOfResidents = linksOfResidents.replace(/\[(.*?)\]/g,"$1");
    linksOfResidents = linksOfResidents.replace(/'/g, '');
    linksOfResidents = linksOfResidents.split(', ');

    var modal = $('#modal');
    var modalContent = $('#modal-content');
    var table = $('<table></table>');





    localStorage.setItem('residents', JSON.stringify(new Array()));

    for (let i = 0; i < linksOfResidents.length; i++) {
        // $.ajax({
        //     dataType: "json",
        //     url: linksOfResidents[i],
        //     success: function(response) {
        //         residents.push({
        //             name: response.name,
        //             height: response.height,
        //             mass: response.mass,
        //             hair_color: response.hair_color,
        //             skin_color: response.skin_color,
        //             eye_color: response.eye_color,
        //             birth_year: response.birth_year,
        //             gender: response.gender
        //         });
        //     }
        // });

        $.get(linksOfResidents[i]).done(function(response) {

            resident = {
                name: response.name,
                height: response.height,
                mass: response.mass,
                hair_color: response.hair_color,
                skin_color: response.skin_color,
                eye_color: response.eye_color,
                birth_year: response.birth_year,
                gender: response.gender
            };
            // var residents = JSON.parse(localStorage.getItem('residents'));
            // residents.push(resident);
            // localStorage.setItem('residents', JSON.stringify(residents))
    


            var name = $('<td>' + resident.name + '</td>');
            var height = $('<td>' + resident.height + '</td>');
            var mass = $('<td>' + resident.mass + '</td>');
            var hairColor = $('<td>' + resident.hair_color + '</td>');
            var skinColor = $('<td>' + resident.skin_color + '</td>');
            var eyeColor = $('<td>' + resident.eye_color + '</td>');
            var birthYear = $('<td>' + resident.birth_year + '</td>');
            var gender = $('<td>' + resident.gender + '</td>');

            var row = $('<tr></tr>');
            row.append(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
            table.append(row);
            modalContent.append(table);

        } );
    }


    // residents = JSON.parse(localStorage.getItem('residents'));
    // alert('logged residents1');
    // console.log(residents);
    // alert('logged residents2');

    // for (let i = 0; i < residents.length; i++) {
    //     var name = $('<td>' + residents[i].name + '</td>');
    //     var height = $('<td>' + residents[i].height + '</td>');
    //     var mass = $('<td>' + residents[i].mass + '</td>');
    //     var hairColor = $('<td>' + residents[i].hair_color + '</td>');
    //     var skinColor = $('<td>' + residents[i].skin_color + '</td>');
    //     var eyeColor = $('<td>' + residents[i].eye_color + '</td>');
    //     var birthYear = $('<td>' + residents[i].birth_year + '</td>');
    //     var gender = $('<td>' + residents[i].gender + '</td>');

    //     var row = $('<tr></tr>');
    //     row.append(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
    //     table.append(row);
    //     modalContent.append(table);
    // }
    modal.show();
    modalContent.show();
}

$('.residents').on('click', createModal);
