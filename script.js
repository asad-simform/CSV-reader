const file = document.querySelector("input[type='file']")
const table = document.getElementById("table")

function textToJSON(data) {
    const finalJSON = []
    const textArr = data.split('\n')
    const headers = textArr[0].split(',')

    for(let i=1;i<textArr.length;i++) {
        const strArr = textArr[i].split(',')
        let obj = {}
        for(let j=0;j<strArr.length;j++) {
            obj[headers[j]] = strArr[j]
        }
        finalJSON.push(obj)
    }

    return {
        headers,
        finalJSON
    }

}

function renderData(data) {
    const { headers, finalJSON } = data
    const tr = document.createElement("tr")
    for (const head of headers) {
        const th = document.createElement("th")
        th.innerText = head 
        tr.appendChild(th)
    }
    table.appendChild(tr)
    for (const ele of finalJSON) {
        const tr = document.createElement("tr")
        for(let i=0;i<headers.length;i++) {
            const td = document.createElement("td")
            td.innerText = ele[headers[i]]
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

file.addEventListener(("change"), async (e) => {
    const file = e.target.files[0]
    const data = await file.text()
    const jsonData = textToJSON(data)
    // console.log(jsonData);
    renderData(jsonData)
})