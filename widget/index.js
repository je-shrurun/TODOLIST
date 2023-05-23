import { createButton } from "./button";
import { createList } from "./list";
import { createCheckbox } from "./checkbox";
import { createContent } from "./content";
import { createInput } from "./input";

window.Widget = {
    //
    button: createButton,
    list: createList,
    getControl: function(){},
    checkbox: createCheckbox,
    content: createContent,
    input: createInput,

};