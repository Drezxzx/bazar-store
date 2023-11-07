window.addEventListener('load', function () {
  const searchBaar = document.getElementById("input-bar");
  const buttoConfirm = document.getElementById("confirm-button");
  let noderesult = document.querySelector(".result");
  const nodeallresult = document.getElementById("allResult")
  const currentURL = window.location.href;
  console.log(nodeallresult);
  if (currentURL !== (location.origin + `/bazar-store/main.php`)) {
    toogleScroll("activated")
    searchBaar.addEventListener('input', () => {
      const valueInput = searchBaar.value
      if (valueInput !== "") {
        getData(valueInput)
      }else{
        searchBaar.placeholder = " todos los resultados"
        getData(valueInput)
      }
      console.log("hola");
    });
  } else {
    toogleScroll()
    searchBaar.addEventListener('input', function () {
      console.log("lol");
      const valueInput = searchBaar.value
      if (valueInput !== "") {
        getData(valueInput, "true")
        console.log("mm");
      } else {
        deleteResult();
      }

    })
  }

});

function getData(value, overlay = false) {
  console.log(value);
  const dataToSend = {
    action: "search",
    valueTosearch: value
  };

  fetch(location.origin + "/bazar-store/ajax/request.php", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(JSON.stringify(dataToSend));
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error en la respuesta de la solicitud.");
        return response.text();
      }
    })
    .then((data) => {
      let nodeWrapper = document.querySelector("main");
      let noderesultFromSeacrh = document.querySelector(".info")
      console.log(noderesultFromSeacrh);
      console.log("Respuesta del servidor:", data);
      if (!overlay) {
        nodeWrapper.innerHTML = "";
        if (data.length !== 0) {
          console.log(dataToSend.valueTosearch);
          data.forEach(product => {
            if (dataToSend.valueTosearch !== "") {
              noderesultFromSeacrh.innerHTML= `<h3 class="moreinformation">Resultado para la busqueda "${dataToSend.valueTosearch}" : ${data.length}</h3>`
            }else{
              noderesultFromSeacrh.innerHTML= `<h3 class="moreinformation">Resultado para la busqueda "Todas" : ${data.length}</h3>`
            }
            nodeWrapper.innerHTML += `
                      <div class='product-search'>
                          <a class="link" href='detailproduct.php?id=${product["id"]}'>
                              <div class='img-product-detail'><img class="width100" src='${product["thumbnail"]}' alt=''></div>
                              <div class='info-product'>
                                  <h3 class='title-search'>${product["title"]}</h3>
                                  <p class='description'>${product["description"]}</p>
                                  <span class='price-val'>
                                      <h4>${product["price"]}€</h4> <span>` + getNumbersOfResult(product["rating"]) + `</span>
                                  </span>
                              </div>
                          </a>
                      </div>
                  `;
          });
        } else {
          nodeWrapper.innerHTML = "<h1> No hay resultados</h1>";
        }
        countTotal(data);

        const buttoncategory = document.querySelectorAll(".related-div");
        let namecategory = null;
        buttoncategory.forEach(button => {
          button.addEventListener('click', function (e) {
            let children = Array.from(button.children);
            console.log(children);
            namecategory ={name : children[1].innerText,
                           number : children[2].innerText }
            orderByCategories(namecategory,data,nodeWrapper,dataToSend.valueTosearch)
            satActiveColor(button);
            
          });
        });

      } else {
        const searchBaar = document.getElementById("input-bar");
        let noderesult = document.querySelector(".result");
        const searchBaarPosition = searchBaar.getBoundingClientRect();
        noderesult.style.top = ((searchBaarPosition.top + 10) + searchBaarPosition.height) + "px";
        noderesult.style.width = (searchBaarPosition.width + 10) + "px";
        noderesult.style.left = (searchBaarPosition.left + 7) + "px";

        deleteResult();
        if (data.length !== 0) {
          data.forEach(product => {
            noderesult.innerHTML += `
                      <a class="link" href='views/detailproduct.php?id=${product["id"]}'>
                          <div class='product-result'>
                              <div class='info-product-result'>
                                  <h3 class='title-result'>${product["title"]}</h3>
                              </div>
                          </div>
                      </a>
                  `;
          });
        } else {
          noderesult.innerHTML = "<h1> No hay resultados</h1>";
        }
      }
    })
    .then((fulldata) => {
      console.log(fulldata + " Array completo");
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}



function deleteResult() {
  let noderesult = document.querySelector(".result");

  noderesult.innerHTML = "";
}

function toogleScroll(state) {
  const body = document.querySelector("html");
  console.log(body.style.overflow);
  if (state === "activated") {
    console.log("si");
    body.style.overflow = "visible";
  } else {
    console.log("no");
    body.style.overflow = "hidden";
  }
  console.log(body.style.overflow);
}

function countTotal(data = null) {
  console.log(data);
  const noderelated = document.querySelector(".related");
  let categoryCounts = {};
  let returnn = "";

  data.forEach(element => {
    let category = element["category"];
    if (categoryCounts[category]) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
  });

  for (const category in categoryCounts) {
    const count = categoryCounts[category];
    console.log(`Categoría: ${category}, Cantidad: ${count}`);
    returnn += `<div id="${getEmojiCategory(category, "class")}" class="related-div"><span>${getEmojiCategory(category)}</span><strong>${category}</strong><span>${count}</div></span>`;
  }
  if (data.length === 0) {
    noderelated.innerHTML = "";
  } else {
    noderelated.innerHTML = returnn;
  }
}


function getEmojiCategory(namecategory = null, nameclass = null) {
  console.log(namecategory);
  if (namecategory === "home-decoration") {
    namecategory = "homedecoration"
  }
  const categories = {
    smartphones: ["📱", "blue"],
    laptops: ["💻", "green"],
    fragrances: ["🧴", "red"],
    skincare: ["💄", "yellow"],
    groceries: ["🍖", "gray"],
    homedecoration: ["🧮", "pink"]
  };
  if (nameclass === null) {
    return categories[namecategory][0]
  } else {
    return categories[namecategory][1]
  }

}

function getNumbersOfResult(number = null) {
  if (number < 5) {
    number = Math.floor(number);
  }
  const blackstart = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>';
  const yellowstart = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 24 24" style="fill: rgba(254, 213, 1, 1);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>';
  const obj = {
    1: `${yellowstart}${blackstart}${blackstart}${blackstart}${blackstart}`,
    2: `${yellowstart}${yellowstart}${blackstart}${blackstart}${blackstart}`,
    3: `${yellowstart}${yellowstart}${yellowstart}${blackstart}${blackstart}`,
    4: `${yellowstart}${yellowstart}${yellowstart}${yellowstart}${blackstart}`,
    5: `${yellowstart}${yellowstart}${yellowstart}${yellowstart}${yellowstart}`
  };
  return obj[number];
}

function orderByCategories(namecategory, obj, div,valueTosearch) {
  let noderesultFromSeacrh = document.querySelector(".info")
  console.log(namecategory.name);
  noderesultFromSeacrh.innerHTML = ""
  div.innerHTML = ""
  obj.forEach(product => {
    if (product["category"] === namecategory.name) {
      if (valueTosearch !== "") {  
        noderesultFromSeacrh.innerHTML =`<h3 class="moreinformation">Resultado para la busqueda "${valueTosearch}"  en "${namecategory.name}" ${namecategory.number} Resultados</h3>`  
      }else{
        noderesultFromSeacrh.innerHTML =`<h3 class="moreinformation">Resultado para la busqueda "Todas"  en "${namecategory.name}" ${namecategory.number} Resultados</h3>` 
      }
      div.innerHTML += `
      <div class='product-search'>
          <a class="link" href='detailproduct.php?id=${product["id"]}'>
              <div class='img-product-detail'><img class="width100" src='${product["thumbnail"]}' alt=''></div>
              <div class='info-product'>
                  <h3 class='title-search'>${product["title"]}</h3>
                  <p class='description'>${product["description"]}</p>
                  <span class='price-val'>
                      <h4>${product["price"]}€</h4> <span>` + getNumbersOfResult(product["rating"]) + `</span>
                  </span>
              </div>
          </a>
      </div>
  `;
    }
  });
}

function satActiveColor(element) {
  const buttoncategory = document.querySelectorAll(".related-div");
  buttoncategory.forEach(button => {
    if (button.classList.contains("actived")) {
      button.classList.remove("actived")
    }
  });
  
  element.classList.add("actived")


}
