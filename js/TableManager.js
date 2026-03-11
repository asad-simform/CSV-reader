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
        this.resetBtn = document.getElementById("reset")
        this.checkboxCon = document.getElementById("checkbox-container")
        this.modalContainer = document.getElementById("modal-container")
        this.exportBtns = document.getElementsByClassName("export-btns")[0]
        this.stats = document.getElementById("stats")
        this.next.addEventListener("click", () => this.nextBtn())
        this.prev.addEventListener("click", () => this.prevBtn())
        this.pageSize.addEventListener("change", (e) => this.pageSizeHandler(e))
        this.filter.addEventListener("input", (e) => this.applyFilterAndSort())
        this.table.addEventListener("click", (e) => this.toggleSort(e))
        this.checkboxCon.addEventListener("click", (e) => this.checkboxHandler(e))
        this.resetBtn.addEventListener("click", (e) => this.resetHandler(e))
        this.exportBtns.addEventListener("click", (e) => this.exportData(e))
        this.modalContainer.addEventListener("click", (e) => { if(e.target === this.modalContainer) this.modalContainer.style.display = "none" })
    }

    renderCheckBox() {
        this.dataObj.headers.forEach((head) => {
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.value = head.val
            checkbox.checked = true
            const label = document.createElement("label")
            label.appendChild(document.createTextNode(head.val.replace("_", " "))) 
            this.checkboxCon.append(checkbox)
            this.checkboxCon.append(label)
        })
    }

    renderData() {
        // console.log(this.headers);
        let start = this.page*this.size - this.size
        this.pageText.innerText = `${this.page}/${Math.ceil(this.data.length / this.size)}`
        let end = this.page*this.size > this.data.length ? this.data.length : this.page*this.size
        this.table.replaceChildren()
        this.stats.replaceChildren()
        const tr = document.createElement("tr")
        for (const head of this.headers) {
            const th = document.createElement("th")
            th.innerHTML = head.val.replace("_", " ")
            if(head.sort === "asc")
                th.innerHTML += "&#9650;"
            else if(head.sort === "desc") 
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
            const ele = this.data[idx]
            for(let i=0;i<this.headers.length;i++) {
                const td = document.createElement("td")
                td.innerText = ele[this.headers[i].val]
                tr.appendChild(td)
            }
            this.table.appendChild(tr)
        }
        this.displayStats()
    }

    nextBtn(e) {
        if(this.page+1 <= Math.ceil(this.data.length / this.size)) {
            this.page++
            this.renderData()
        }
        else return
        console.log(this.page);
    }

    prevBtn() {
        if(this.page > 1) {
            this.page--
            this.renderData()
        } else return 
        console.log(this.page);
    }

    pageSizeHandler(e) {
        this.size = Number(e.target.value)
        if(this.page > this.data.length/this.size) this.page = Math.ceil(this.data.length/this.size)
        this.renderData()
        console.log(this.size);
    }

    toggleSort(e) {
        // console.log(e.target);
        
        if(e.target.tagName === "TH") {
            this.headers.forEach((head, index) => {
                if(head.val === e.target.dataset.val) {
                    if(head.sort === "none") head.sort = "asc"
                    else if(head.sort === "asc") head.sort = "desc"
                    else head.sort = "none"
                    this.index = index
                } else head.sort = "none"

            })
            this.applyFilterAndSort()
        } else if(e.target.closest("tr")) {
            console.log(this.modalContainer.classList);
            
            this.modalContainer.style.display = "block"
            this.modalContainer.replaceChildren()
            const popupBody = document.createElement("div")
            popupBody.classList.add("modal-body")
            Array.from(e.target.parentElement.children).forEach((val, idx) => {
                const div = document.createElement("div")
                div.append(`${this.headers[idx].val}: ${val.innerText}`)
                popupBody.append(div)
            })
            this.modalContainer.append(popupBody)
            // document.body.append(popup)
            
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
                if(isNaN(this.data[0][this.headers[this.index].val]))
                    this.data.sort((a,b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase()))
                else this.data.sort((a,b) => Number(a[key]) - Number(b[key]))
            }
            else if(sort === "desc") {
                if(isNaN(this.data[0][this.headers[this.index].val]))
                    this.data.sort((a,b) => b[key].toLowerCase().localeCompare(a[key].toLowerCase()))
                else this.data.sort((a,b) => Number(b[key]) - Number(a[key]))
            }
            else this.index = -1
        } 
        if(this.page > this.data.length/this.size) this.page = Math.ceil(this.data.length/this.size)
        if(this.page === 0 && Math.ceil(this.data.length/this.size) > 0) this.page = 1
        this.renderData()
    }

    checkboxHandler(e) {
        if(e.target.type === "checkbox") {
            const head = Array.from(this.checkboxCon.querySelectorAll("input[type='checkbox']")).filter((ch) => ch.checked === true).map((val) => val.value)
            this.headers = this.dataObj.headers.filter((val) => head.includes(val.val))
            // console.log(newHead);
            
            this.applyFilterAndSort()
        }
    }

    resetHandler(e) {
        this.headers.forEach((head) => {
            head.sort = "none"
        })
        this.filter.value = ""
        this.applyFilterAndSort()
    }

    exportData(e) {
        if(e.target.tagName === "BUTTON") {
            if(e.target.id === "json") {
                let jsonArr = []

                this.data.forEach((data) => {
                    let obj = {}
                    for (const element of this.headers) {
                        obj[element.val] = data[element.val]
                    }
                    jsonArr.push(obj)
                })

                const jsonString = JSON.stringify([this.headers, jsonArr], null, 4)
                const blob = new Blob([jsonString], {type: "application/json"})
                const href = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = href 
                link.download = "data.json"
                document.body.append(link)
                link.click()
                document.body.removeChild(link)
            } else if(e.target.id === "csv") {
                let csvString = ""
                this.headers.forEach((val, idx) => {
                    csvString += val.val
                    if(idx < this.headers.length - 1) csvString += "," 
                })
                csvString += "\n"
                // console.log(this.data);
                
                this.data.forEach((val) => {
                    let arr = []
                    for (const element of this.headers) {
                        arr.push(val[element.val])
                    }
                    csvString += arr.join(",")
                    csvString += "\n"
                })
                
                const blob = new Blob([csvString], {type: "text/csv;charset=utf-8;"})
                const href = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = href 
                link.download = "data.csv"
                document.body.append(link)
                link.click()
                document.body.removeChild(link)
            }
            
        }
        
    }

    displayStats() {
        let heading = ["gender", "department", "job_title", "country", "status"]
        let headers = this.headers.map((val) => val.val)

        for (const element of headers) {
            if(heading.includes(element)) {
                const div = document.createElement("div")
                div.classList.add("stats")
                let obj = {}
                for (let index = 0; index < this.data.length; index++) {
                    if(this.data[index][element] in obj) {
                        obj[this.data[index][element]]++
                    } else {
                        obj[this.data[index][element]] = 0
                    }
                }
                Object.keys(obj).forEach((key) => {
                    const p = document.createElement("p")
                    p.appendChild(document.createTextNode(`${key}: ${obj[key]}`))
                    div.appendChild(p)
                })
                this.stats.appendChild(div)
            }

        }

    }

}

export { TableManager }