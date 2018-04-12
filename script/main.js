//All the JS and JQuery code will de written inside this anonymous function
$(document).ready(function () {

    //This function launch our application, and is tasked with the initialisation of every aspect of it
    function init(showAtStartup) {
        navigateView(showAtStartup);
        $('[data-target]').on('click', function () {
            navigateView(this.dataset.target);
        });
        $('[data-ajax]').on('click', function () {
            $.get("https://swapi.co/api/people/1", function (data) {
/* let name = "Nom : " + data.name;
let mass = "Poids : " + data.mass;
let birthDate = "Date de naissance : " + data.birth_year; */
//JQuery
/* $'[data-page="home"]').append('<p>' + name + '</p>');
$'[data-page="home"]').append('<p>' + mass + '</p>');
$'[data-page="home"]').append('<p>' + birthDate + '</p>'); */
//Javascript
/* let values = document.createElement('p');
nameP.innerHTML = name;
document.querySelector('[data-page="home"]').appendChild(nameP);
let values = document.createElement('p');
nameP.innerHTML = mass;
document.querySelector('[data-page="home"]').appendChild(nameP);
let values = document.createElement('p');
nameP.innerHTML = birthDate;
document.querySelector('[data-page="home"]').appendChild(nameP);
//Boucle Javascript */
                let values = [
                    name = "Nom : " + data.name,
                    mass = "Poids : " + data.mass,
                    birthDate = "Date de naissance : " + data.birth_year,
                ];

                for (let i = 0; i <values.length; i++) {
                    let p = document.createElement('p');
                    p.innerHTML = values[i];
                    document.querySelector('[data-page="home"]').append(p);
                }
            });
        });
    }

    //Allow to hide and show every section of our application
    function navigateView (sectionToShow) {
        let sections = $('[data-page]');
        let error = true;
        for (let i = 0; i < sections.length; i++) {
            if(sections[i].dataset.page == sectionToShow) {
                sections[i].classList.remove('hidden');
                error = false;
            } else {
                sections[i].classList.add('hidden');
            }
        }
        if(error) {
            throw ('Selector error, nothing found for ' + sectionToShow);
        }
    }

    init('home');
});