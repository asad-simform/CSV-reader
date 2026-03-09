import { TableManager } from "./TableManager.js"

const file = document.querySelector("input[type='file']")
// const table = document.getElementById("table")
// const prev = document.getElementById("prev")
// const next = document.getElementById("next")
// const pageSize = document.getElementById("pageSize")
// const pageText = document.getElementById("page") // 1/100
// const pagination = document.querySelector(".pagination")

// let page = 1
// let size = 10
// const dataObj = {
//     headers: [],
//     finalJSON: []
// }

const manager = new TableManager()



// function renderData(start, end) {
//     const tr = document.createElement("tr")
//     for (const head of dataObj.headers) {
//         const th = document.createElement("th")
//         th.innerText = head 
//         tr.appendChild(th)
//     }
//     table.appendChild(tr)
//     console.log(start, end);
    
//     for (let idx=start;idx<end;idx++) {
//         console.log(idx);
        
//         const tr = document.createElement("tr")
//         const ele = dataObj.finalJSON[idx]
//         for(let i=0;i<dataObj.headers.length;i++) {
//             const td = document.createElement("td")
//             td.innerText = ele[dataObj.headers[i]]
//             tr.appendChild(td)
//         }
//         table.appendChild(tr)
//     }
// }

file.addEventListener("change", async (e) => {
    const file = e.target.files[0]
    const data = await file.text()
    manager.textToJSON(data)
    manager.pagination.style.display = "flex"
    // console.log(jsonData);
    manager.renderData(0, manager.size)
})

// pageSize.addEventListener("change", (e) => {
//     size = e.target.value    
// })

// next.addEventListener("click", (e) => {
//     if(page+1 <= dataObj.finalJSON.length / size) {
//         page++
//         pageText.innerText = `${page}/${dataObj.finalJSON.length / size}`
//         table.replaceChildren()
//         renderData(page*size - size, page*size)
//     }
//     else return
//     console.log(page);
// })

// prev.addEventListener("click", (e) => {
//     if(page > 1) {
//         page--
//         pageText.innerText = `${page}/${dataObj.finalJSON.length / size}`
//         table.replaceChildren()
//         renderData(page*size - size, page*size)
//     } else return 
//     console.log(page);
    
// })

// pageSize.addEventListener("change", (e) => {
//     size = Number(e.target.value)
//     if(page > dataObj.finalJSON.length/size) page = dataObj.finalJSON.length/size
//     pageText.innerText = `${page}/${dataObj.finalJSON.length / size}`
//     table.replaceChildren()
//     renderData(page*size - size, page*size)
//     console.log(size);
    
// })