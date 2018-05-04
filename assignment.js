$(function () {
  
  function fetchData(){
     $.ajax({
        url: "https://agl-developer-test.azurewebsites.net/people.json",
        type: 'get',
        dataType: 'json',
        success: function (data) {
            processData(data);
        },
        error: function (data) {
          alert("Something wrong with the data fetching");
        }
    });
  }

  function processData(jsonData) {
    var filterPet = "Cat";
    var catsMaleOwner = [];
    var catsFemaleOwner = [];
    var petsMaleElement = document.getElementById("petsMale");
    var petsFemaleElement = document.getElementById("petsFemale");

    // Filter
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].gender === "Male") {
          catsMaleOwner.push.apply(catsMaleOwner, jsonData[i].pets);
      } else {
          catsFemaleOwner.push.apply(catsFemaleOwner, jsonData[i].pets)
      }
    }

    catsMaleOwner = $.grep(catsMaleOwner, function(v) {
      return v.type === filterPet;
    });

    catsFemaleOwner = $.grep(catsFemaleOwner, function(v) {
      return v.type === filterPet;
    });

    // Sort
    catsMaleOwner = catsMaleOwner.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })    

    catsFemaleOwner = catsFemaleOwner.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    }) 
      
    // Render
    $.each(catsFemaleOwner, function (index, item) {
      var li = document.createElement("li");

      li.textContent = item && item["name"] || '';
      petsFemaleElement.appendChild(li);
    });

    $.each(catsMaleOwner, function (index, item) {
      var li = document.createElement("li");

      li.textContent = item && item["name"] || '';
      petsMaleElement.appendChild(li);
    });
  }

  fetchData();
});