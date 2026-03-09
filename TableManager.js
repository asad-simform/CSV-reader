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
        this.filter = document.getElementById("filter")
        this.next.addEventListener("click", () => this.nextBtn())
        this.prev.addEventListener("click", () => this.prevBtn())
        this.pageSize.addEventListener("change", (e) => this.pageSizeHandler(e))
        this.filter.addEventListener("input", (e) => this.filterHandler(e))
    }

    nextBtn(e) {
        if(this.page+1 <= Math.ceil(this.data.length / this.size)) {
            this.page++
            this.pageText.innerText = `${this.page}/${Math.ceil(this.data.length / this.size)}`
            this.table.replaceChildren()
            let end = this.page*this.size > this.data.length ? this.data.length : this.page*this.size
            this.renderData(this.headers, this.data, this.page*this.size - this.size, end)
        }
        else return
        console.log(this.page);
    }

    prevBtn() {
        if(this.page > 1) {
            this.page--
            this.pageText.innerText = `${this.page}/${Math.ceil(this.data.length / this.size)}`
            this.table.replaceChildren()
            let end = this.page*this.size > this.data.length ? this.data.length : this.page*this.size
            this.renderData(this.headers, this.data, this.page*this.size - this.size, end)
        } else return 
        console.log(this.page);
    }

    pageSizeHandler(e) {
        this.size = Number(e.target.value)
        if(this.page > this.data.length/this.size) this.page = Math.ceil(this.data.length/this.size)
        this.pageText.innerText = `${this.page}/${Math.ceil(this.data.length / this.size)}`
        this.table.replaceChildren()
        let end = this.page*this.size > this.data.length ? this.data.length : this.page*this.size
        this.renderData(this.headers, this.data, this.page*this.size - this.size, end)
        console.log(this.size);
    }

    filterHandler(e) {
        this.data = this.dataObj.finalJSON.filter((user) => Object.values(user).some((val) => String(val).toLowerCase().includes(e.target.value.toLowerCase())))
        if(this.page > this.data.length/this.size) this.page = Math.ceil(this.data.length/this.size)
        if(this.page === 0 && Math.ceil(this.data.length/this.size) > 0) this.page = 1
        // this.pageText.innerText = `${this.page}/${this.data.length / this.size}`
        this.pageText.innerText = `${this.page}/${Math.ceil(this.data.length / this.size)}`
        this.table.replaceChildren()
        let end = this.page*this.size > this.data.length ? this.data.length : this.page*this.size
        this.renderData(this.headers, this.data, this.page*this.size - this.size, end)
    }
}

export { TableManager }