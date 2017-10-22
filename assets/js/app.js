jQuery(document).ready(function ($) {

    //create variables
    var results = document.getElementById("results");
    var submit = document.getElementById("submit");
    var search = document.getElementById("search");
    var code = "";
    var pattern;
    var url;

    //build url with pattern (pattern is value from input field)
    function build_url(pattern) {
        var base_url = "https://gwo.pl/booksApi/v1/search?query=";
        url = base_url + pattern;
        return url;
    }

    //when click on submit
    $(submit).click(function (e) {
        e.preventDefault();

        code="";
        pattern = $(search).val();
        url = build_url(pattern); //call function to build url with value from input field

        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function (data) {

                //if nothing found...
                if (data.length <= 0){
                    code += '<p>Przepraszamy, nic nie znaleziono :(</p>';
                    results.innerHTML = code;
                }

                //if found!
                else{

                    var i;
                    for (i = 0; i < data.length; i++) {

                        code += '<div class="item col-xs-12 col-md-6 col-lg-4">';
                        code += '<div class="item__wrapper">';
                        code += '<div class="item__wrapper__thumb">';
                        code += '<img src="' + data[i].cover + '" alt="images-' + [i] + '"/>';
                        code += '</div>';

                        code += '<div class="item__wrapper__header">';
                        code += '<h1 class="title">' + data[i].title + '</h1>';
                        code += '<p class="author">' + "Autor: " + data[i].author + '</p>';
                        code += '</div>';

                        code += '<div class="item__wrapper__info">';
                        code += '<ul class="list">';
                        code += '<li>' + "Szkoła: " + data[i].levels[0].school + " - " + data[i].levels[0].class + '</li>';
                        code += '<li>' + "Przedmiot: " + data[i].subject + '</li>';
                        code += '<li>' + "ISBN: " + data[i].isbn + '</li>';
                        code += '<li>' + "MEN: " + data[i].men + '</li>';
                        code += '<li>' + "Liczba stron: " + data[i].pages_count + '</li>';
                        code += '</ul>';
                        code += '</div>';

                        code += '<a target="_blank" class="btn btn-primary" href="' + data[i].url + '">Przejdź do księgarni</a>';

                        code += '</div>';
                        code += "</div>";

                        results.innerHTML = code;
                    }

                }
            },
            error: function (errorMessage) {
                console.log("Błąd.");
            }
        });
    });

});
