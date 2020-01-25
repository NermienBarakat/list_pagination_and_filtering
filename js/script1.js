/******************************************
Treehouse Techdegree:
Full Stack JavaScript - Project 2: List Filter and Pagination
******************************************/

// Global variables
const page = document.querySelector('.page');
const fullStudentList = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('.page-header');


const pageButtonsDiv = document.createElement('div');
const pageButtonsUl = document.createElement('ul');
const noResultsDiv = document.createElement('div');


const maxStudentsPerPage = 10;


// Append elements for pagination buttons
pageButtonsDiv.className = 'pagination';
pageButtonsDiv.appendChild(pageButtonsUl);
page.appendChild(pageButtonsDiv);

// Append element to display if no students match search query
noResultsDiv.textContent = '🧐 Sorry, no students match your search query.';
noResultsDiv.style.fontSize = '1.5rem';
noResultsDiv.style.margin = '4rem';
noResultsDiv.style.textAlign = 'center';
noResultsDiv.style.display = 'none';
page.appendChild(noResultsDiv);

// Hide all items in list except for the ten you want to show
const showPage = (list, button) => {
	// Set all students to display none
	for(let i = 0; i < fullStudentList.length; i++) {
		fullStudentList[i].style.display = 'none';
	}
  
	// If no results, display message
	if(list.length === 0) {
		noResultsDiv.style.display = 'block';
	}
	// else display students based on page button selection
	else {
		let indexStart = ((button - 1) * maxStudentsPerPage);
		let indexEnd = (indexStart + maxStudentsPerPage);
		for(let i = indexStart; i < indexEnd && i < list.length; i++) {
			list[i].style.display = 'block';
		}
		noResultsDiv.style.display = 'none';
	}
};

// Generate, append and add functionality to pagination buttons
const appendPageLinks = (studentList) => {
	let numStudents = studentList.length;
	let numPages = Math.ceil(numStudents / maxStudentsPerPage);
	let selectedButton = 1;
	pageButtonsUl.innerHTML = '';

	showPage(studentList, selectedButton);

	// Create new button for each page
	for(let i = 0; i < numPages; i++) {
		let button = document.createElement('li');
		let anchor = document.createElement('a');
		anchor.href = '#';
		// Make first button active
		if(i === 0) {
			anchor.className = 'active';
		}
		// Buttons text will start at 1 instead of 0
		anchor.textContent = i + 1;
		button.appendChild(anchor);
		pageButtonsUl.appendChild(button);
	}

	// Update page when new page button clicked
	pageButtonsUl.addEventListener('click', (e) => {
		let previousButton = document.querySelector('.active');
		previousButton.className = '';
		selectedButton = e.target.textContent;
		e.target.className = 'active';
		showPage(studentList, selectedButton);
	});
};


// Call when file is initially loaded
appendPageLinks(fullStudentList);