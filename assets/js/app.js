//form, addİnpt, todoList, firsCardBody, secondCrdBody, clearButton
const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firsCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clearButton = document.querySelector('#clearButton');
const filterInput = document.querySelector('#todoSearch');

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        //Ekrandan Silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storage'dan Silme
        removeTodoToStorage(todo.textContent);
        Swal.fire({
            icon: 'success',
            title: 'Başarılı',
            background: '#212529',
            color: '#fff',
            text: 'Todo list silindi!',
        })
    }
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item")
    if (todoListesi.length>0) {
        todoListesi.forEach(function (todo){
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style","display: block");
            }else{
                todo.setAttribute("style","display: none !important");
            }
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            background: '#212529',
            color: '#fff',
            text: 'Arama yapmak için en az 1 adet todo list  olaması gerekir!',
        })
    }
}

function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length>0) {
        todoListesi.forEach(function (todo){
            todo.remove();
        })
        //Storage'dan silme
        todos = [];
        localStorage.setItem("todos",JSON.stringify(todos));
        Swal.fire({
            icon: 'success',
            title: 'Başarılı',
            background: '#212529',
            color: '#fff',
            text: 'Tüm todolar başarıyla silindi!',
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            background: '#212529',
            color: '#fff',
            text: 'Bu işlemin gerçekleşmesi için en az 1 adet todo list olması gerekir!',
        })
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            background: '#212529',
            color: '#fff',
            text: 'Lütfen boş bırakmayınız!',
        })
    } else {
        //Arayüze ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        Swal.fire({
            icon: 'success',
            title: 'Başarılı',
            background: '#212529',
            color: '#fff',
            text: 'Todo list eklendi!',
        })
    }

    //storage ekleme
    e.preventDefault();
}

function addTodoToUI(newTodo) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex bg-dark text-white justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";



}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}