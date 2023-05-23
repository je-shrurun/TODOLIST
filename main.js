// import { todo } from "node:test";

// import { container } from "webpack";

var todolist = [];

renderTodoList();
renderDoneList();

var inputBtnEl = document.getElementById("todo-input")
var contentsEl = document.getElementById("todo-contents")

var containerEl = document.getElementById("container");



var inputControl = Widget.input({
    
});
containerEl.append(inputControl.el);

var sampleControl = Widget.button({
    label: "샘플",
    onClick: function(){
        alert("샘플입니다");
    },
});

document.body.append(sampleControl.el)


var inputBtnClick = Widget.button({
    label: "입력",
    onClick: function(){
        if(!inputControl.el.value){
            alert("할일 입력");
            return;
        }

        Widget.getControl("todo-input");

        todolist.push({
            id: crypto.randomUUID(),
            contents: inputControl.el.value,
            done: false,
        });
        
        todolistControl.reload(getSortedTodoList({ done: false }));

        inputControl.el.value ="";
        inputControl.el.focus();
    }
});
containerEl.append(inputBtnClick.el)


var todolistControl = Widget.list({
    datas: getSortedTodoList({ done: false }),
    columns:[
        {render: checkbox},
        {render: content},
        {render: dtlbutton}

 ],
});
containerEl.append(todolistControl.el);

var donelistControl = Widget.list({
    datas: getSortedTodoList({ done: true }),
    columns:[
        {render: checkbox},
        {render: content},
        {render: dtlbutton}

 ],
});
containerEl.append(donelistControl.el);


function renderTodoList() {}

function renderDoneList(){
    // var donelistEl = document.getElementById("done-list");
    // donelistEl.innerHTML = "";

    // todolist
    //     .filter(function(item) {return item.done})
    //     .forEach(function(item){
    //       var itemEl = createTodoItem(item)
    //       donelistEl.append(itemEl);
    // });
}

// function createTodoItem(item) {
//     var liEl = document.createElement("li");
    
//     // 체크박스
//     var checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.checked = item.done;
//     checkbox.onchange = function (e){
//         item.done = e.target.checked;
//         // target, currentTarget -> 버블링
//         renderTodoList();
//         renderDoneList();
//     };

//     // 컨텐츠
//     var contents = document.createElement("span");
//     contents.textContent = item.contents;

//     // 삭제버튼

//     liEl.append(checkbox);
//     liEl.append(contents);
//     liEl.append(delBtn.el);
//     return liEl 
// };

function checkbox (data){
    var checkboxControl = Widget.checkbox({
        checked: false,
        onChange: function(e){
            data.done = e.target.checked;
        },
    });
    return checkboxControl.el
};

function content (data){
    var contentContorl = Widget.content({
        label: data.contents,
    })
    return contentContorl.el
};

function dtlbutton(data){
    var delBtnControl = Widget.button({
        label: "삭제",
        onClick: function(){
     // splice
     todolist.splice(todolist.indexOf(data), 1);
     todolistControl.reload(todolist);  
   }
})
return delBtnControl.el
};


function getSortedTodoList(option) {
    return todolist.filter(item => item.done === option.done)}
