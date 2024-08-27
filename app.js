let data = '';
function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json');
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            data = JSON.parse(xhr.responseText);
            updateDom('daily');
        }
    };

    xhr.send();
}

function updateDom(whichData) {
    data.forEach((unitData) =>{
        const item = removeSpaces((unitData.title).toLowerCase());
        const currentData = document.querySelector(`.${item} .current-time`);
        currentData.textContent = `${unitData.timeframes[whichData].current}hrs`;

        const previousData = document.querySelector(`.${item} .last-week`);
        switch(whichData) {
            case 'daily':
                previousData.textContent = `Yesterday - ${unitData.timeframes[whichData].previous}hrs`;
                break;
            case 'weekly':
                previousData.textContent = `Last Week - ${unitData.timeframes[whichData].previous}hrs`;
                break;
            case 'monthly':
                    previousData.textContent = `Last Monnth - ${unitData.timeframes[whichData].previous}hrs`;
                    break;
        }
        
    });
}

function removeSpaces(inputString) {
    return inputString.replace(/\s+/g, '');
}

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item) => {
    item.addEventListener('click', changeDOM);
});

function changeDOM(e) {
    navItems.forEach((item) => {
        item.classList.remove('selected');
    });
    e.currentTarget.classList.add('selected');
    const timeFrame = e.currentTarget.getAttribute('data-item');
    updateDom(timeFrame);
}

fetchData();