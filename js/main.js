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
}


const checkWhoWinner = function checkingWinner()
{
    // console.log(Date.now());
    variables.winnerCoordinates.forEach((item) => {
        item.forEach((element) => {
            console.log(htmlElements.fieldElements[element].outerHTML);
        });
    });
    // console.log(Date.now());
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
                // playerCPU(variables.countFreeElements);
                checkWhoWinner();
                setTimeout(() => {playerCPU(variables.countFreeElements)}, 750);
            }
        }
    }
});
