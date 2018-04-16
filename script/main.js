//All the JS and JQuery code will de written inside this anonymous function
$(document).ready(function () {

    //This function launch our application, and is tasked with the initialisation of every aspect of it
    function init(showAtStartup) {
        navigateView(showAtStartup);
        $('[data-target]').on('click', function () {
            navigateView(this.dataset.target);
        });
        $('[data-ajax]').on('click', function () {
            $.get("https://dog.ceo/api/breeds/list/all", function (data) {
                let breedsList = Object.keys(data.message);
                let list = document.createElement('ul');
                list.classList.add('list-style');
                for (let i = 0; i < breedsList.length; i++) {
                    let listElement = document.createElement('li');
                    listElement.innerHTML = breedsList[i];
                    list.appendChild(listElement);
                }
                document.querySelector('[data-page="home"]').appendChild(list);
                //https://dog.ceo/api/breed/hound/images
                //On va devoir créer des eventListener pour le clic sur chacune des races
                $('li').on('click', function () {
                    $.get('https://dog.ceo/api/breed/' + $(this).html() + '/images/random', function (imgs) {
                        if ($('.modal').length > 0) {
                            $('.modal').remove();
                            addDiv(imgs);
                        } else {
                            addDiv(imgs);
                        }
                    });
                });
                //Quand on clique, on lance une nouvelle requête ajax qui récupèrera une liste d'images pour la race cliquée
            });
        });
    }

    //Create a div for the img
    function addDiv(imgs) {
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('modal');
        let img = document.createElement('img');
        img.src = imgs.message;
        imgDiv.appendChild(img);
        document.querySelector('[data-page="home"]').appendChild(imgDiv);
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