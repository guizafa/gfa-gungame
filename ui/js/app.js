$(document).ready(function() {
    window.addEventListener("message", function(event) {
        let data = event.data;
        if (data.action == 'open') {
            showPlayers(data.players)
        }
        if (data.update) {
            showDeathTime(data.time)
        }
        if (data.notify) {
            var html = '<div id="ct-notify">' +
                '<div id="killer">' + data.attacker + '</div>' +
                '<div id="icon" style = "background-image:url(images/' + data.img + ')"></div>' +
                '<div id="victim">' + data.victim + '</div>' +
                '</div>';
            $(html).fadeIn(500).appendTo("#notifications").delay(8000).fadeOut(500);
        }
        if (data.winner) {
            showWinner(data.plyname)
        }
    });
});

const setupPlayerList = playerlistdata => {
    $('.ct-players').html('')
    const list = JSON.parse(playerlistdata).sort((a, b) => (a.pontos > b.pontos) ? -1 : 1)
    let index = 0
    $.each(list, (k, v) => {
        let source = v.name
        let pontos = v.pontos
        index += 1

        var htmlinsert = '<div class="ct-player" id="ply-' + index + '">' +
            '<h2 class="h2-default">' + source + '</h2><p class="points">' + pontos + '</p>' +
            '</div>';

        $('.ct-players').append(htmlinsert)
    })
}

function showPlayers(players) {
    $('.container').show()
    $('.ct-scoreboard').css('display', 'flex')
    $('.count-p').html(JSON.parse(players).length)
    setupPlayerList(players)
}

function showDeathTime(deathtime) {
    if (deathtime > 0) {
        $('.ct-count-death').css('display', 'flex')
        $('.h1-death').html(deathtime)
    } else {
        $('.ct-count-death').css('display', 'none')
    }
}

function showWinner(winner) {
    if (winner) {
        $('.ct-count-death').css('display', 'none')
        $('.ct-winner').css('display', 'flex')
        $('.h1-winner').html(' ' + winner + ' ')
    }
}