let inputText = document.getElementById('search_input');
let searchButton = document.getElementById('search');
let clearButton = document.getElementById('clear');
let page = document.getElementById('recommendations');


function display_destinations() {
    const searchString = inputText.value.toLowerCase().trim();
    
    // 1. Guard Clause: Stop completely if the user typed nothing
    if (!searchString) {
        return; 
    }

    // 2. Clear previous search items BEFORE fetching new ones
    clearContent();

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error!');
            }
            return response.json();
        })
        .then(data => {
            data.countries.forEach(country => {
                if (country.name.toLowerCase() === searchString) {
                    // 3. Just loop and append here safely!
                    country.cities.forEach(city => {
                        let container = document.createElement('div');
                        container.classList.add('card'); // Class name for grid responsive layout
                        container.innerHTML = `
                            <img src="${city.imageUrl}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                        `;
                        
                        page.appendChild(container);
                    });
                }
            });
            if(searchString=='temples'||searchString=='temple'){
                data.temples.forEach(temple=>{
                    let container=document.createElement('div');
                    container.classList.add('card');
                    container.innerHTML=`
                            <img src="${temple.imageUrl}">
                            <h3>${temple.name}</h3>
                            <p>${temple.description}</p>
                        `;
                        page.appendChild(container);
                    
                });
            }
            else if(searchString=='beaches'||searchString=='beach'){
                data.beaches.forEach(beach=>{
                    let container=document.createElement('div');
                    container.classList.add('card');
                    container.innerHTML=`
                            <img src="${beach.imageUrl}">
                            <h3>${beach.name}</h3>
                            <p>${beach.description}</p>
                        `;
                        page.appendChild(container);
                    
                });

            }
            else if(searchString=='country'||searchString=='countries'){
                 data.countries.forEach(country => {
                
                    // 3. Just loop and append here safely!
                    country.cities.forEach(city => {
                        let container = document.createElement('div');
                        container.classList.add('card'); // Class name for grid responsive layout
                        container.innerHTML = `
                            <img src="${city.imageUrl}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                        `;
                        
                        page.appendChild(container);
                    });
                });
            

            }
            
        })

       
        .catch(error => {
            console.log('Fetch error:', error);
        });
}

function clearContent() {
    document.getElementById('main_content').innerHTML = '';
    document.getElementById('recommendations').innerHTML = '';
}
function resetHTML(){
    clearContent();
    let main_body=document.getElementById('main_content');
    let context=document.createElement('div');
    context.classList.add('main_content');

    context.innerHTML=`
    <h1>EXPLORE DREAM<br>DESTINATION</h1>
    <p class="description">The Travel Recommendation App helps 
    users explore popular travel destinations 
    through an interactive and user-friendly interface. It allows users to search for 
    beaches, temples, countries...
    </p>
    <button class="book_button">Book Now</button>
    `;
    main_body.appendChild(context);
}
clearButton.addEventListener('click',resetHTML);
searchButton.addEventListener('click', display_destinations);