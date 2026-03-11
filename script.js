import { TableManager } from "./js/TableManager.js"

const file = document.querySelector("input[type='file']")
const manager = new TableManager()

file.addEventListener("change", async (e) => {
    const file = e.target.files[0]
    const data = await file.text()
    manager.textToJSON(data)
    manager.pagination.style.display = "flex"
    manager.exportBtns.style.display = "flex"
    manager.renderCheckBox()
    manager.renderData(manager.headers, manager.data, 0, manager.size)
    // manager.displayStats()
})
