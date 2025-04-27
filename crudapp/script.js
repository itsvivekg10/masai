console.log("hello world");

let limit = 10;
let gallery = document.getElementById("gallery");

async function fetchData() {
    try {
        let res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`);
        let datas = await res.json();
        dataRender(datas);
        console.log(datas);
    } catch (err) {
        console.log(err);
    }
}

function dataRender(datas) {
    gallery.innerHTML = "";
    datas.forEach((data) => {
        let div = document.createElement("div");
        div.innerHTML = `<img src="${data.url}" alt="${data.title}" />`;
        gallery.appendChild(div);
    });
}

fetchData();
