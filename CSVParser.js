class CSVParser {
    constructor() {
        this.dataObj = {
            headers: [],
            finalJSON: []
        }
        this.headers = []
        this.data = []
        this.table = document.getElementById("table")
    }
    textToJSON(data) {
        const textArr = data.split('\n')
        this.dataObj.headers = textArr[0].split(',')

        for(let i=1;i<textArr.length;i++) {
            const strArr = textArr[i].split(',')
            let obj = {}
            for(let j=0;j<strArr.length;j++) {
                obj[this.dataObj.headers[j]] = strArr[j]
            }
            this.dataObj.finalJSON.push(obj)
        }
        this.headers = [...this.dataObj.headers]
        this.data = JSON.parse(JSON.stringify(this.dataObj.finalJSON))
    }
    renderData(headers, data, start, end) {
        const tr = document.createElement("tr")
        for (const head of headers) {
            const th = document.createElement("th")
            th.innerText = head 
            tr.appendChild(th)
        }
        this.table.appendChild(tr)
        console.log(start, end);
        
        for (let idx=start;idx<end;idx++) {
            console.log(idx);
            
            const tr = document.createElement("tr")
            const ele = data[idx]
            for(let i=0;i<headers.length;i++) {
                const td = document.createElement("td")
                td.innerText = ele[headers[i]]
                tr.appendChild(td)
            }
            this.table.appendChild(tr)
        }
    }
}

export { CSVParser }