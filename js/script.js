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
   const startIndex = (page * perPage) - perPage;
   const endIndex = page * perPage;
   const studentList = document.querySelector('.student-list');

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

// Render initial page
showPage(data, 1);

// Add pagination for other pages
addPagination(data);
