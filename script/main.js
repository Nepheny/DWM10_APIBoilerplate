//All the JS and JQuery code will de written inside this anonymous function
$(document).ready(function () {

    //This function launch our application, and is tasked with the initialisation of every aspect of it
    function init(showAtStartup) {
        navigateView(showAtStartup);
        $('[data-target]').on('click', function () {
            navigateView(this.dataset.target);
        });
        $('[data-ajax="Appel en cours"]').on('click', function () {
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
            });
        });


        //let inputText = document.querySelector('[data-ajax="EnvoiEnCours"]').value;
        $('[data-ajax]').on('keypress', function (e) {
           if(e.key == "Enter") {
               $.get("https://dog.ceo/api/breeds/list/all", function (data) {
                    let breedsList = Object.keys(data.message);
                    let inputValue = document.querySelector('[data-ajax="EnvoiEnCours"]').value;
                    for (let i = 0; i < breedsList.length; i++) {
                        if (breedsList[i] == inputValue) {
                            $.get('https://dog.ceo/api/breed/' + inputValue + '/images/random', function (imgs) {
                                if ($('.modal').length > 0 || $('.error-text').length > 0) {
                                    $('.modal').remove();
                                    $('.error-text').remove();
                                    addDivImg(imgs);
                                } else {
                                    addDivImg(imgs);
                                }
                            });
                        } else if(inputValue == "") {
                            let text = document.createTextNode("Veuillez entrer le nom d'une race.");
                            if ($('.error-text').length > 0) {
                                $('.error-text').remove();
                                $('.modal').remove();
                                addDivText(text);
                            } else {
                                addDivText(text);
                            }
                        } else {
                            let text = document.createTextNode("La race que vous avez tapé n'est pas répertoriée dans notre API.");
                            if ($('.error-text').length > 0) {
                                $('.error-text').remove();
                                $('.modal').remove();
                                addDivText(text);
                            } else {
                                addDivText(text);
                            }
                        }
                    }
                });
            }
        });
    }

    //Create a div for the paragraph
    function addDivText(text) {
        let paragraphDiv = document.createElement('div');
        paragraphDiv.classList.add('error-text');
        let paragraph = document.createElement('p');
        paragraph.appendChild(text);
        paragraphDiv.appendChild(paragraph);
        document.querySelector('[data-div="content"]').appendChild(paragraphDiv);
    }

    //Create a div for the img with
    function addDivImg(imgs) {
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('modal');
        let img = document.createElement('img');
        img.src = imgs.message;
        imgDiv.appendChild(img);
        document.querySelector('[data-div="content"]').appendChild(imgDiv);
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