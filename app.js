let sabe = true

function saveData(data) {
    $.post("https://52e5imxbftoafjuq22sekscfci0fqcuy.lambda-url.sa-east-1.on.aws/emissions", data)
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
        if (type == 'laptop') {
            watts = '80'
        }

        const co2 = parseInt(watts) * 60 * 52 * 0.0003966
        
        $('#txt-resultado').text(`Tu computadora consume ${co2} TCO2e al año`)
        $('#resultados').prop('hidden', false)

        saveData({
            type,
            watts,
            co2
        })
    })
})

