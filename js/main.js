
// category all fetch

const fetchCetegory = async () => {

    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();

        loadCategorys(data.categories);

    } catch (err) {
        console.log("Something went wrong!", err)
    }
}

// catch all pets and cate-wise pets 
const fetchAllPets = async (catchCateName = "") => {
    try {

        const url = catchCateName
            ? `https://openapi.programming-hero.com/api/peddy/category/${catchCateName}`
            : 'https://openapi.programming-hero.com/api/peddy/pets';
        const res = await fetch(url);
        const data = await res.json();
        const pets = catchCateName ? data.data : data.pets;
        loadPets(pets);

    } catch (err) {
        console.log("Something went wrong!", err)
    }

}

// fetch pets details by id

const fetchDetailsById = async (petsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petsId}`);
    const data = await res.json();
    showDetailsModal(data.petData);
}


// load categories 
const loadCategorys = (categories) => {


    const categorysContainer = document.getElementById('categorysContainer');
    categories.forEach(category_items => {

        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleBtn('${category_items.category}')" id="btn-${category_items.category}"
                    class="flex cata_btn items-center justify-center md:my-3 gap-4  bg-opacity-15 py-3 px-4 rounded-3xl border-2 ">
                    <img src="${category_items.category_icon}" alt="cats img" class="w-[30px]">
                    <h2 class="text-xl font-[900]">${category_items.category}</h2>

                </button>
        `;
        div.classList.add('flex', 'justify-center')

        categorysContainer.appendChild(div);

    })

}

// load pets all and with their category wise

const loadPets = (pets) => {

    const cuties_container = document.getElementById('cuties_container');
    cuties_container.innerHTML = `
         <div></div>
         <div class="text-center" class=" for_spinner"><span class="loading loading-bars loading-lg  for_spinner"></span></div>
        <div class=""></div>

    `;


    setTimeout(() => {



        if (!pets || !Array.isArray(pets)) {
            console.log("not defined");
            return;
        }



        cuties_container.innerHTML = "";

        if (pets.length == 0) {
            cuties_container.classList.remove('grid');
            cuties_container.innerHTML = `
           <div class="flex flex-col h-[60vh] justify-center items-center">
                <img src="../images/error.webp" alt="no videos available icon">
                <p class="text-2xl mt-3 font-semibold">No Cuties Are Not Available Now!</p>
            </div>
        `;

        } else {
            cuties_container.classList.add('grid');
        }

        pets.forEach(pet => {
            const cuties_div = document.createElement('div');

            cuties_div.innerHTML = `
             <div class="cutie_card border-2 rounded-3xl p-3" data-price="${pet.price}">
                        <div class="p-2">
                            <img src="${pet.image}"
                                alt="cats img" class="w-full h-[200px] md:h-[190px] lg:h-[170px] border-2 rounded-2xl">
                        </div>

                        <div class="p-2">
                        ${pet.pet_name ? ` <h2 class="text-2xl text-[#131313] font-semibold pb-2">${pet.pet_name}</h2>` : "Name Not Found"}
                           
                            <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                                    src="https://img.icons8.com/?size=24&id=8daFRWXj88dq&format=png" alt="icon"
                                    class="w-[15px]">Bread: ${pet.breed ? `<span
                                    class="lg:text-sm lg:font-bold xl:text-[20px] xl:font-normal">${pet.breed}</span>` : "Not Found"}</p>
                            <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                                    src="https://img.icons8.com/?size=48&id=12776&format=png" alt="calender img"
                                    class="w-[15px]">Birth: ${pet.date_of_birth ? ` <span>${pet.date_of_birth}</span>` : "Not Found"}</p>
                            <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                                    src="https://img.icons8.com/?size=30&id=77841&format=png" alt="gender icon"
                                    class="w-[15px]">Gender: ${pet.gender ? `<span>${pet.gender}</span>` : "Not Found"}</p>
                            <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg  "><img
                                    src="https://img.icons8.com/?size=50&id=484&format=png" alt="price img"
                                    class="w-[15px]">Price: ${pet.price ? `<span>${pet.price}</span>` : "Price Not Found"}$</p>

                            <div class="divider"></div>

                            <div class="more_details_container flex gap-1  items-center justify-between">
                                <button onclick="handleImgByLikeBtn('${pet.image}')" class="btn px-2 border-2  border-[#0E7A81]"><img
                                        src="https://img.icons8.com/?size=50&id=24816&format=png" alt=""
                                        class="w-[25px]"></button>
                                <button id="adopt_your_cuties_btn" onclick="adoptBtn(event)"
                                    class="btn px-2 border-2 border-[#0E7A81] text-[#0E7A81] text-[18px]">Adopt</button>
                                <button onclick="moreDetails('${pet.petId}')"
                                    class="btn px-2 border-2 border-[#0E7A81] text-[#0E7A81] text-[18px]">Details</button>
                            </div>
                        </div>

                    </div>

      
     
        `;
            cuties_container.appendChild(cuties_div);



        })

    }, 2000);

}

// show modal
// show modal for specific id's
const showDetailsModal = (petsDataById) => {
    const modal_container = document.getElementById('modalContainer');
    modal_container.innerHTML = `
          <div class="p-2">
              <img src="${petsDataById.image}"
                  alt="cats img" class="w-full h-[200px] md:h-[220px] lg:h-[250px] border-2 rounded-2xl">
          </div>
      
          <div class="p-2">
             ${petsDataById.pet_name ? ` <h2 class="text-2xl text-[#131313] font-semibold pb-2">${petsDataById.pet_name}</h2>` : "Name Not Found"}
              <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                      src="https://img.icons8.com/?size=24&id=8daFRWXj88dq&format=png" alt="icon"
                      class="w-[15px]">Bread:${petsDataById.breed ? `<span
                      class="lg:text-sm lg:font-bold xl:text-[20px] xl:font-normal">${petsDataById.breed}</span>` : "Not Found"}</p>
              <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                      src="https://img.icons8.com/?size=48&id=12776&format=png" alt="calender img"
                      class="w-[15px]">Birth: ${petsDataById.date_of_birth ? ` <span>${petsDataById.date_of_birth}</span>` : "Not Found"}</p>
              <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                      src="https://img.icons8.com/?size=30&id=77841&format=png" alt="gender icon"
                      class="w-[15px]">Gender: ${petsDataById.gender ? `<span>${petsDataById.gender}</span>` : "Not Found"}</p>
              <p class="flex gap-2 items-center text-[#131313B3] text-opacity-20 text-lg"><img
                      src="https://img.icons8.com/?size=50&id=484&format=png" alt="price img"
                      class="w-[15px]">Price:${petsDataById.price ? ` <span>${petsDataById.price}</span>` : "Not Found"}$</p>
      
              <div class="divider"></div>
      
              <div>
                    <h2 class="text-xl font-bold py-3 text-gray-400">Details:</h2>
                    ${petsDataById.pet_details ? `<p>${petsDataById.pet_details}</p>` : "Not Found"}
                  
              </div>
               
          </div>
    `;

    //Show modal when button was clicked
    const modal = document.getElementById('my_modal_5');
    modal.showModal();



}

// show modal for when adopt button is clicked
const adoptBtn = (event) => {

    // adopt button disabled when button is clicked
    const button = event.target;
    button.disabled = true;

    const modal_container = document.getElementById('modalContainer');
    modal_container.innerHTML = `

    <div class="flex flex-col justify-center items-center px-4 lg:px-0">
    
        <div><img src="https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png"></div>
        <h2 class="text-4xl my-3 font-bold">Congrats!</h2>
        <p class="counterNum text-5xl font-bold">3</p>

    </div>
 
    `;
    //Show modal when button was clicked
    const modal = document.getElementById('my_modal_5');
    modal.showModal();

    // counter decrease logic
    let counter = 3;

    const counterNum = document.querySelector('.counterNum');
    const countdown = setInterval(() => {
        counter--;
        counterNum.innerText = counter;

        if (counter === 0) {
            clearInterval(countdown);
            modal.close();



        }
    }, 1000);

}


// All button handle here


// load image into right side when like button was clicked
const handleImgByLikeBtn = (petsImgByLikeBtn) => {

    const imgShowByLikeBtnClicked = document.getElementById('imgShowByLikeBtnClicked');

    const div = document.createElement('div');
    div.innerHTML = `
         <div>
             <img src="${petsImgByLikeBtn}"
                 alt="cats img" class="w-full h-[110px]  md:h-[150px] lg:h-[110px] border-2 rounded-2xl">
                        </div>
        `;

    imgShowByLikeBtnClicked.appendChild(div);


}

// Details btn handle
const moreDetails = (petsId) => {
    fetchDetailsById(petsId)
}

// btn handle 
const handleBtn = (cateName) => {
    fetchAllPets(cateName);

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.cata_btn');
    allButtons.forEach(btn => {
        btn.classList.remove('bg-[#0E7A81]', 'border-[#0E7A81]');  // Remove active styles
    });

    // Add active class to the clicked button
    const clickedButton = document.getElementById(`btn-${cateName}`);
    clickedButton.classList.add('bg-[#0E7A81]', 'border-[#0E7A81]');  // Add active styles
}

// handle button for sorted by price
const sortedByPrice = () => {

    const cuties_container = document.getElementById('cuties_container');

    const cuties_cards = Array.from(cuties_container.getElementsByClassName('cutie_card'));

    if(cuties_cards.length === 0){
        return;
    }

    //  loading spinner
    cuties_container.innerHTML = `
        <div></div>
        <div class="text-center for_spinner"><span class="loading loading-bars loading-lg for_spinner"></span></div>
        <div class=""></div>
    `;

    setTimeout(() => {
        cuties_cards.sort((a, b) => {
            const card1 = parseFloat(a.getAttribute('data-price'));
            const card2 = parseFloat(b.getAttribute('data-price'));

            // if price is not found or price in undefined or NaN
            const value1 = isNaN(card1) ? 0 : card1;
            const value2 = isNaN(card2) ? 0 : card2;

            return value2 - value1; // Descending order  
        });

        // clear before all cuties card and append new card
        cuties_container.innerHTML = "";
        cuties_cards.forEach(card => {
            cuties_container.appendChild(card);
        });
    }, 2000);
}



fetchCetegory();
fetchAllPets();