let sabe = true

function saveData(data) {
    $.ajax({
        type: 'POST',
        url: 'https://52e5imxbftoafjuq22sekscfci0fqcuy.lambda-url.sa-east-1.on.aws/emissions',
        data: JSON.stringify(data),
        dataType: 'text',
        contentType: 'text/plain'
    })
}

$(document).ready(function () {
    $('#no-sabe').on('click', () => {
        sabe = false
        $('#watts').prop('disabled', true)
    })
    
    $('#frm').submit(e => {
        e.preventDefault()

        let watts = '500'
        if (sabe && $.trim($('#watts').val()).length) {
            watts = $('#watts').val()
        }

        const type = $('#pc-type').val()
        if (!sabe && type == 'laptop') {
            watts = '80'
        }

        watts = parseInt(watts)
        const hs = parseInt($('#horas').val()) 
        const kwh = (watts/1000) * hs
        const co2 = kwh * 365 * 0.0003966
        const co2_redond = Math.round(co2 * 100000) / 100000
        
        const trees = co2 / 0.340
        const trees_redond = Math.round(trees * 1000) / 1000

        $('#txt-resultado').html(`Tu compu consume <i>${co2_redond}</i> TCO2 al año`)
        $('#resultados').prop('hidden', false)
        $('#main').prop('hidden', true)
        $('#arboles').text(`Se necesitan ${trees_redond} arboles para compensarlo`)

        let arbolitos = ''

        for (let i = 0; i < Math.floor(trees); i++) {
            arbolitos += '<i class="fa-solid fa-tree m-1" style="overflow: hidden; width: 16px;"></i>'
        }

        const crop = (trees - Math.floor(trees)) * 14
        arbolitos += `<i class="fa-solid fa-tree m-1" style="overflow: hidden; width: ${crop}px;"></i>`

        $('#arbolitos-iconos').html(arbolitos)

        saveData({type, watts, co2, trees})
    })
})

