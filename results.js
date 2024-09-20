setInterval(updateData, 10000)

function updateData() {
    $.get("https://l0br5kqg16.execute-api.sa-east-1.amazonaws.com/v1/emissions", (data, status) => {
        const body = JSON.parse(data)

        let watts = 0
        let TCO2 = 0
        let trees = 0 

        for (let item of body) {
            watts += item.watts
            TCO2  += item.co2
            trees += item.trees
        }

        watts = watts/1000

        $('#cant').text(body.length)
        $('#watts').text(watts)
        $('#co2').text(Math.round(TCO2))
        $('#trees').text(trees)

        let arbolitos = ''

        for (let i = 0; i < Math.floor(trees); i++) {
            arbolitos += '<i class="fa-solid fa-tree m-1" style="overflow: hidden; width: 16px;"></i>'
        }

        const crop = (trees - Math.floor(trees)) * 14
        arbolitos += `<i class="fa-solid fa-tree m-1" style="overflow: hidden; width: ${crop}px;"></i>`

        $('#treecont').html(arbolitos)
    })
}