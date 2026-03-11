class CSVParser {
    constructor() {
        this.dataObj = {
            headers: [],
            finalJSON: []
        }
        this.headers = []
        this.data = []

    }
    textToJSON(data) {
        const textArr = data.split('\n')
        
        for (const val of textArr[0].split(",")) {
            this.dataObj.headers.push({val: val, sort: "none"})
        }

        for(let i=1;i<textArr.length;i++) {
            const strArr = textArr[i].split(',')
            let obj = {}
            for(let j=0;j<strArr.length;j++) {
                obj[this.dataObj.headers[j].val] = strArr[j]
            }
            this.dataObj.finalJSON.push(obj)
        }
        this.headers = JSON.parse(JSON.stringify(this.dataObj.headers))
        
        this.data = JSON.parse(JSON.stringify(this.dataObj.finalJSON))
        // console.log(this.headers, this.data);
    }
    
}

export { CSVParser }