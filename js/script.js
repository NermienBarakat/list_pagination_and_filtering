/******************************************
List Filter and Pagination - Using Vanilla JS 
- Nermien Barakat nermien@treenodes.com
******************************************/
// Globel Var for List item & number of items per page. 
const list = document.querySelectorAll('.client-item');
const ITEM_PER_PAGE = 5;
const searchInput = document.querySelector('.client-search-input');

// Search query Handler
const searchQuery = (e) => {
    let searchText = e.target.value.toLowerCase();
    let searchNumber = 0;
    const filteredList = [];
    list.forEach(item => {
        let listItemText = item.getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (listItemText.indexOf(searchText) > -1) {
            item.style.display = '';
            searchNumber++;
            filteredList.push(item);
           
        } else {
            item.style.display = 'none';
        }
    });
    init(filteredList);
    document.querySelector('.search-number').innerText = `${searchNumber} found`;
}

searchInput.addEventListener('keyup', searchQuery);

const showPage = (list, currentPage) => {
    // Iterate through list item to hide
    for (let item = 0; item < list.length; item++) {
        list[item].style.display = 'none';
    }
    if (list.length === 0) {
        console.log('nothing to see')
    } else {
        // Show item using index 
        let indexStart = (currentPage - 1) * ITEM_PER_PAGE;
        let indexEnd = indexStart + ITEM_PER_PAGE;
        for (indexStart; indexStart < indexEnd && indexStart < list.length; indexStart++) {
            list[indexStart].style.display = 'block';
        }
    }
}
//Change background color function 

const bgColorChanges = (activeBtn) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    activeBtn.style.backgroundColor = "#" + randomColor;
    let title = document.getElementsByTagName('h3');
    for (let i = 0; i < title.length; i++) {
        title[i].style.color = "#" + randomColor;
    }
}

//generate, append, and add functionality to the pagination buttons.
const init = (list) => {
    // calculate total pages
    const totalPages = Math.ceil(list.length / ITEM_PER_PAGE);
    // Create new button for each page
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    let paginationBtn;
    for (let i = 0; i < totalPages; i++) {
        paginationBtn = document.createElement('BUTTON');
        paginationBtn.classList.add('js-pagination-btn');
        if (i === 0) {
            paginationBtn.classList.add('js-active-btn')
        }
        const text = document.createTextNode(`${i + 1}`);
        paginationBtn.appendChild(text);
        pagination.appendChild(paginationBtn);
        paginationBtn.addEventListener('click', function (e) {
            let prevActiceBtn = document.querySelector('.js-active-btn');
            prevActiceBtn.disabled = false;
            prevActiceBtn.className = 'js-pagination-btn';
            prevActiceBtn.style.backgroundColor = '#eaeaea';
            showPage(list, (i + 1));
            this.classList.add('js-active-btn');
            this.disabled = true;
            bgColorChanges(this);
        })
    }
    showPage(list, 1);
}

init(list);

