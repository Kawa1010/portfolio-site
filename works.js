fetch("works.csv")
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {

        // CSVを行ごとに分割
        var rows = data.trim().split("\n");

        // 1行目は見出し
        var headers = rows[0].split(",");

        //2行目以降を作品データにする
        var works = rows.slice(1).map(function(row) {

            var values = row.split(",");

            var work
             = {};

            headers.forEach(function(header, index) {
                work[header] = values[index];
            });  
            
            return work;
        });    

        //Worksを表示する場所
        var grid = document.getElementById("works-grid");

        var categorySelect = document.getElementById("category");

        var sortSelect = document,getElementById("sort");

        var categories = [];

        works.forEach(function(work) {

            if (!categories.includes(work.category)) {
                categories.push(work.category);
            }
        });

        function displayWorks() {

            var selectedCategory = categorySelect.value;

            var sortType = sortSelect.value;

            var filterdWorks = works.slice();
            
            if (selectedCategory !== "all") {
                filteredWorks = filterdWorks.filter(function(work) {
                    return work.category === selectedCategory;
                });   
        }   

        if (sortType === "new") {
            filteredWorks.sort(function(a, b) {
                return Number(a.year) - Number(b.year);
            });
        }      
        else if (sortType === "old") {
            filteredWorks.sort(function(a, b) {
                return Number(a,year) - Number(b,year);
            });
        }      
        else if (sortType === "title") {
            filteredWorks.sort(function(a, b) {
                return a.title.localeCompare(b.title, "ja");
            });
        }           
        categories.forEach(function(category) {
            var option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelevt.appendChild(option);
        });   
            //作品を1つずつ表示
        works.forEach(function(work) {

            var card = document.createElement("article");
            
            card.className = "work-card";

            card.innerHTML =
                '<a href="' + work.link + '">' +
                    '<img src="' + work.image + '" alt="' + work.title + '">' +
                    '<h4>' + work.title + '</h4>' +
                    '<p>' + work.description + '</p>' +
                '</a>';
            
                grid.appendChild(card);
        });
    })   
// カテゴリー一覧を作る
var category