/*
Treehouse Techdegree:
FSJS Project 2 - list Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/list-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// Number of items we want to display per page
const perPage = 9;

// Function to render html contents of a page
function showPage(list, page) {
   const studentList = document.querySelector('.student-list');
   const startIndex = (page * perPage) - perPage;
   const endIndex = page * perPage;

   // remove any existing students by clearing inner html
   studentList.innerHTML = '';

   // Loop through the data set using the start and end index
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const student = list[i];
         // Markup for displaying a student
         const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>`;
         // Insert adjacent to studentList
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   // Calculate number of needed pages
   const numPages = Math.ceil(list.length / perPage);
   const linkList = document.querySelector('.link-list');
   // Reset linkList each page load
   linkList.innerHTML = '';
   // Loop through numPages and render buttons 
   for (let i = 1; i < numPages + 1; i++) {
      const html = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML('beforeend', html);
   };
   // Select first button to set active class
   const firstBtn = linkList.querySelector('li button');
   firstBtn.className = 'active';

   linkList.addEventListener('click', (e) => {
      const btn = e.target;
      // Only fire event for button tags
      if (btn.tagName == 'BUTTON') {
         // Reset all button's class to null
         for (let i = 0; i < linkList.children.length; i++) {
            linkList.children[i].querySelector('button').className = '';
         }
         // Apply active class to the button that was just clicked
         btn.classList = 'active';
         // Render the requested page
         showPage(list, parseInt(btn.textContent));
      };
   });
};

// Call functions

// create main function to handle search
function main(data) {
   // Render initial page
   showPage(data, 1);
   // Add pagination for other pages
   addPagination(data);
};

// Run main function on first load
main(data);

/*
Search functionality
*/

const header = document.querySelector('header');

// Render form search input and button
html = `
   <div id='searchBox'>
      <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   </div>
`
header.insertAdjacentHTML('beforeend', html);

const searchBtn = header.querySelector('button');
const searchInput = header.querySelector('input');

/***
 * `searchStudents` takes input field and a list,
 * returns: array of search results
 ***/
function searchStudents(input, list) {
   const searchVal = input.value.toLowerCase();
   const searchList = []

   for (let i = 0; i < list.length; i++) {
      const student = list[i]
      // consider using regex in future release
      if (student.name.first.toLowerCase().indexOf(searchVal) !== -1
         || student.name.last.toLowerCase().indexOf(searchVal) !== -1) {
         searchList.push(student);
      }
   }
   return searchList;
}

/***
 * `searchOrMain` provides logic to either search data set or render main page
 ***/
function searchOrMain() {
   if (searchInput.value.length !== 0) {
      let resultsList = searchStudents(searchInput, data);
      if (resultsList.length == 0) {
         document.querySelector('.student-list').textContent = 'No results found';
         document.querySelector('.link-list').innerHTML = '';
         return 1;
      } else {
         showPage(resultsList, 1);
         addPagination(resultsList);
      }
   } else {
      main(data);
   }
};

// handle search methods, click or type 
searchBtn.addEventListener('click', () => searchOrMain());
searchInput.addEventListener('keyup', () => searchOrMain());
