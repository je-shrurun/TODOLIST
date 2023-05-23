// import { todo } from "node:test";

var todolist = [];

renderTodoList();
renderDoneList();

var inputEl = document.getElementById("todo-input")
var contentsEl = document.getElementById("todo-contents")

var containerEl = document.getElementById("container");
var inputBtnClick = Widget.button({
    label: "입력",
    onClick: function(){
        if(!contentsEl.value){
            alert("할일 입력");
            return;
        }
        todolist.push({
            id: crypto.randomUUID(),
            contents: contentsEl.value,
            done: false,
        });
        renderTodoList();
        contentsEl.value ="";
        contentsEl.focus();
    }
});
containerEl.append(inputBtnClick)


inputEl.onclick = function(){
    if(!contentsEl.value){
        alert("할일 입력");
        return;
    }
    todolist.push({
        id: crypto.randomUUID(),
        contents: contentsEl.value,
        done: false,
    });
    renderTodoList();
    contentsEl.value ="";
    contentsEl.focus();
}

function renderTodoList(){
    var todolistEl = document.getElementById("todo-list")
    todolistEl.innerHTML = "";

    todolist
        .filter(function(item) {return !item.done})
        .forEach(function(item){
            var itemEl = createTodoItem(item);
            todolistEl.append(itemEl);
    });

}

var todolistEl = Widget.list(){
    datas: todolist,
    columns: [{
        render: function(data){
            Widget.button({
                lavbel:"삭제"
            })
        }
    }]
}

containerEl.append(todolistEl.el);

function renderDoneList(){
    var donelistEl = document.getElementById("done-list");
    donelistEl.innerHTML = "";

    todolist
        .filter(function(item) {return item.done})
        .forEach(function(item){
          var itemEl = createTodoItem(item)
          donelistEl.append(itemEl);
    });
}

function createTodoItem(item) {
    var liEl = document.createElement("li");
    
    // 체크박스
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;
    checkbox.onchange = function (e){
        item.done = e.target.checked;
        // target, currentTarget -> 버블링
        renderTodoList();
        renderDoneList();
    };

    // 컨텐츠
    var contents = document.createElement("span");
    contents.textContent = item.contents;
    // 삭제버튼
     var delBtnControl = Widget.button({
        label: "삭제",
        onClick: function(){
            todolist.splice(todolist.indexOf(item), 1);
            item.done ? renderDoneList() : renderTodoList();
        },
    });


    var delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.onclick = function() {
        // filter
        // todolist = todolist.filter(function(item2){
        //     return item2 !== item;
        // }); 

        // splice
        todolist.splice(todolist.indexOf(item), 1);
        item.done ? renderDoneList() : renderTodoList();
    };

    liEl.append(checkbox);
    liEl.append(contents);
    liEl.append(delBtn.el);
    return liEl 
};

