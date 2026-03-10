import { CSVParser } from "./CSVParser.js"

class TableManager extends CSVParser {
    constructor() {
        super()
        this.page = 1
        this.size = 10
        this.index = -1
        this.prev = document.getElementById("prev")
        this.next = document.getElementById("next")
        this.pageSize = document.getElementById("pageSize")
        this.pageText = document.getElementById("page") // 1/100
        this.pagination = document.querySelector(".pagination")
        this.filter = document.getElementById("filter")
        this.table = document.getElementById("table")
        this.next.addEventListener("click", () => this.nextBtn())
        this.prev.addEventListener("click", () => this.prevBtn())
        this.pageSize.addEventListener("change", (e) => this.pageSizeHandler(e))
        this.filter.addEventListener("input", (e) => this.applyFilterAndSort())
        this.table.addEventListener("click", (e) => this.toggleSort(e))
    }

    renderData(headers, data, start, end) {
        // console.log(this.headers);
        
        const tr = document.createElement("tr")
        for (const head of headers) {
            const th = document.createElement("th")
            th.innerHTML = head.val.replace("_", " ")
            if(head.sort === "asc")
                th.innerHTML += "&#9650;"
            else if(head.sort === "des") 
                th.innerHTML += "&#9660;"  
            // console.log(head.sort, th.innerHTML);
             
            th.dataset.val = head.val
            tr.appendChild(th)
        }
        this.table.appendChild(tr)
        // console.log(start, end);
        
        for (let idx=start;idx<end;idx++) {
            // console.log(idx);
            
            const tr = document.createElement("tr")
            const ele = data[idx]
            for(let i=0;i<headers.length;i++) {
                const td = document.createElement("td")
                td.innerText = ele[headers[i].val]
                tr.appendChild(td)
            }
            this.table.appendChild(tr)
        }
        
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

    toggleSort(e) {
        if(e.target.tagName === "TH") {
            this.headers.forEach((head, index) => {
                if(head.val === e.target.dataset.val) {
                    if(head.sort === "none") head.sort = "asc"
                    else if(head.sort === "asc") head.sort = "des"
                    else head.sort = "none"
                    this.index = index
                } else head.sort = "none"

            })
            this.applyFilterAndSort()
        }
    }

    applyFilterAndSort() {
        if(this.filter.value && this.filter.value.trim() !== "") {
            this.data = this.dataObj.finalJSON.filter((user) => Object.values(user).some((val) => String(val).toLowerCase().includes(this.filter.value.toLowerCase())))
        } else {
            this.data = JSON.parse(JSON.stringify(this.dataObj.finalJSON))
        }

        if(this.index!==-1) {
            let key = this.headers[this.index].val
            let sort = this.headers[this.index].sort
            if(sort === "asc") {
                if(isNaN(this.data[0][this.headers[this.index]]))
                    this.data.sort((a,b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase()))
                else this.data.sort((a,b) => a[key] - b[key])
            }
            else if(sort === "des") {
                if(isNaN(this.data[0][this.headers[this.index]]))
                    this.data.sort((a,b) => b[key].toLowerCase().localeCompare(a[key].toLowerCase()))
                else this.data.sort((a,b) => b[key] - a[key])
            }
            else this.index = -1
        } 
        if(this.page > this.data.length/this.size) this.page = Math.ceil(this.data.length/this.size)
        if(this.page === 0 && Math.ceil(this.data.length/this.size) > 0) this.page = 1
        this.pageText.innerText = `${this.page}/${Math.ceil(this.data.length / this.size)}`
        let end = this.page*this.size > this.data.length ? this.data.length : this.page*this.size
        this.table.replaceChildren()
        this.renderData(this.headers, this.data, this.page*this.size - this.size, end)
    }

}

export { TableManager }