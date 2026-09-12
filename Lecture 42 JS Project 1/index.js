let todos = [
    {
        id: Date.now() + 1,
        text: "Go to gym",
        isCompleted: false
    },
    {
        id: Date.now() + 2,
        text: "take class",
        isCompleted: false
    },
    {
        id: Date.now() + 3,
        text: "Revision web dev",
        isCompleted: false
    }
]

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")

let editTodoId = null

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoValue = todoInput.value

    console.log({ editTodoId, todoValue });

    if (editTodoId) {
        todos = todos.map((todo) => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                }

            }
            return todo
        })

    } else {
        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }

        todos.push(newTodo)

    }
    renderTodo() // jab koi naya todo add hoga first update todos render ho jaega
})



function renderTodo() {
    todoList.innerHTML = ""
    todos.forEach((todo) => {
        addTodo(todo)

    })
}
renderTodo()// jab first time file execute hoga tab exixting todo render ho jaega      

function addTodo(todo) {
    const li = document.createElement("li")
    li.dataset.id = todo.id
    li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`
    li.innerHTML = `
                    <input data-id=${todo.id} ${todo.isCompleted === true ? 'checked' : ""} type="checkbox">
                    <p class="flex-1">${todo.text}</p>
                    <div class="flex gap-2">
                        <button data-action="edit" data-id=${todo.id}>Edit</button>
                        <button data-action="delete" data-id=${todo.id}>Delete</button>
                    </div>
    `
    todoList.append(li)
}
// Use of event deligation
todoList.addEventListener('click', (e) => {

    let li = e.target.closest("li")
    let btn = e.target.closest("button")
    let action = btn?.dataset.action;
    let id = li?.dataset?.id
    let checkBox = e.target.closest('input[type="checkbox"]')

    if (action === "edit") {
        console.log("editing...");
    }

    if (action === "delete") {
        // console.log("deleting...");
        todoDelete(e, id)
    }

    if (action === "edit") {
        editTodo(id)
    }

    if (checkBox) {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }

            return todo
        })
        console.log(todos);
    }
})

function todoDelete(e, id) {
    e.target.closest("li").remove()

    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })

}

function editTodo(id) {
    editTodoId = id;
    let currentTodo = todos.find((todo) => {
        if (todo.id === Number(id)) {
            return todo
        }

    })
    todoInput.value = currentTodo.text

    formBtn.textContent = "Update"
}