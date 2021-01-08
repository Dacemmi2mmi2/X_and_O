const htmlElements = {
    field : document.querySelector('.field'),
    fieldElements : document.querySelectorAll('.field>div'),
    winnerHuman : document.querySelector('.winnerHuman'),
    winnerCPU : document.querySelector('.winnerCPU'),
}


const variables = {
    countFreeElements : [],
    winnerCoordinates : [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
    check : 0,
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
                if(countCheck.winnerX === 3)
                {
                    variables.check ++;
                    winner('Human');
                }
            }
            if(htmlElements.fieldElements[element].outerHTML.length === 43 && htmlElements.fieldElements[element].outerHTML.charAt(34) === 'O')
            {
                countCheck.winnerO ++;
                if(countCheck.winnerO === 3)
                {
                    variables.check ++;
                    winner('CPU');
                }
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
            if(variables.countFreeElements.length != 0)
            {
                variables.countFreeElements.splice(variables.countFreeElements.indexOf(event.target.className), 1);
                checkWhoWinner();
                variables.check === 0 ? setTimeout(() => {playerCPU(variables.countFreeElements)}, 100) : '';
            }
        }
    }
});


const winner = function showWinner(nameWinner)
{
    nameWinner === 'Human' ? htmlElements.winnerHuman.style.left = 'auto' : htmlElements.winnerCPU.style.left = 'auto';
}
