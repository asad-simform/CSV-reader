import { CSVParser } from "./CSVParser.js"

class TableManager extends CSVParser {
    constructor() {
        super()
        this.page = 1
        this.size = 10
        this.prev = document.getElementById("prev")
        this.next = document.getElementById("next")
        this.pageSize = document.getElementById("pageSize")
        this.pageText = document.getElementById("page") // 1/100
        this.pagination = document.querySelector(".pagination")

        this.next.addEventListener("click", (e) => {
            if(this.page+1 <= this.dataObj.finalJSON.length / this.size) {
                this.page++
                this.pageText.innerText = `${this.page}/${this.dataObj.finalJSON.length / this.size}`
                this.table.replaceChildren()
                this.renderData(this.page*this.size - this.size, this.page*this.size)
            }
            else return
            console.log(this.page);
        })

        this.prev.addEventListener("click", (e) => {
            if(this.page > 1) {
                this.page--
                this.pageText.innerText = `${this.page}/${this.dataObj.finalJSON.length / this.size}`
                this.table.replaceChildren()
                this.renderData(this.page*this.size - this.size, this.page*this.size)
            } else return 
            console.log(this.page);
            
        })

        this.pageSize.addEventListener("change", (e) => {
            this.size = Number(e.target.value)
            if(this.page > this.dataObj.finalJSON.length/this.size) this.page = this.dataObj.finalJSON.length/this.size
            this.pageText.innerText = `${this.page}/${this.dataObj.finalJSON.length / this.size}`
            this.table.replaceChildren()
            this.renderData(this.page*this.size - this.size, this.page*this.size)
            console.log(this.size);
            
        })
    }
}

export { TableManager }