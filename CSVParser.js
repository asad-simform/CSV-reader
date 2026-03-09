class CSVParser {
    constructor() {
        this.dataObj = {
            headers: [],
            finalJSON: []
        }
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
    }
    renderData(start, end) {
        const tr = document.createElement("tr")
        for (const head of this.dataObj.headers) {
            const th = document.createElement("th")
            th.innerText = head 
            tr.appendChild(th)
        }
        this.table.appendChild(tr)
        console.log(start, end);
        
        for (let idx=start;idx<end;idx++) {
            console.log(idx);
            
            const tr = document.createElement("tr")
            const ele = this.dataObj.finalJSON[idx]
            for(let i=0;i<this.dataObj.headers.length;i++) {
                const td = document.createElement("td")
                td.innerText = ele[this.dataObj.headers[i]]
                tr.appendChild(td)
            }
            this.table.appendChild(tr)
        }
    }
}

export { CSVParser }