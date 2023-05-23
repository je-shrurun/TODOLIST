export function createContent(option){
    var el = document.createElement("label");
    el.innerHTML = option.label;

    return{
        el: el,
    }
}
