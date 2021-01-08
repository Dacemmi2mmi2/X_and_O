const htmlElements = {
    field : document.querySelector('.field'),
    fieldElements : document.querySelectorAll('.field>div'),
}


const variables = {
    countFreeElements : [],
    winnerCoordinates : [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
}


htmlElements.fieldElements.forEach((item) => {
    variables.countFreeElements.push(item.className);
});


const playerCPU = function playerComputer(fieldFreeElements)
{
    let position = Math.floor(Math.random() * (fieldFreeElements.length - 1)),
        clickElementCPU = document.querySelector(`.${fieldFreeElements[position]}`);

    clickElementCPU.setAttribute('name', 'block_O');
    variables.countFreeElements.splice(variables.countFreeElements.indexOf(fieldFreeElements[position]), 1);

    checkWhoWinner();
}


const checkWhoWinner = function checkingWinner()
{
    variables.winnerCoordinates.forEach((item) => {
        let countCheck = {
            winnerX : 0,
            winnerO : 0,
        }
        item.forEach((element) => {
            if(htmlElements.fieldElements[element].outerHTML.length === 43 && htmlElements.fieldElements[element].outerHTML.charAt(34) === 'X')
            {
                countCheck.winnerX ++;
                countCheck.winnerX === 3 ? console.log('win X') : '';
            }
            if(htmlElements.fieldElements[element].outerHTML.length === 43 && htmlElements.fieldElements[element].outerHTML.charAt(34) === 'O')
            {
                countCheck.winnerO ++;
                countCheck.winnerO === 3 ? console.log('win O') : '';
            }
        });
    });
}


htmlElements.field.addEventListener('click', (event) => {
    if (event.target.closest('section'))
    {
        let clickElement = document.querySelector(`div.${event.target.className}`);
        if(!clickElement.hasAttribute('name'))
        {
            clickElement.setAttribute('name', 'block_X');
            if(variables.countFreeElements.length != 1)
            {
                variables.countFreeElements.splice(variables.countFreeElements.indexOf(event.target.className), 1);
                checkWhoWinner();
                setTimeout(() => {playerCPU(variables.countFreeElements)}, 750);
            }
        }
    }
});
