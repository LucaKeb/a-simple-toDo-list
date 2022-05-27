(function() {
    const tasks = [];

    function saveTasks() {
        const tasksJSON = JSON.stringify(tasks);
        localStorage.setItem('savedTasks', tasksJSON);
    }

    document.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('.input-task');
        if (!valida(input)) return;
        createTask(input.value);

        tasks.push(input.value.trim());
        console.log(tasks);

        cleanInput(input);
        saveTasks();
    });
    
    document.addEventListener('click', (e) => {
        const el = e.target;
    
        if (el.classList.contains('button-remove')) {
            deleteTaskArray(el);
            el.parentNode.remove();
            saveTasks();
        }
    });

    function deleteTaskArray(el) {
        const divTask = el.parentNode;
        const p = divTask.children[0].innerText;
        tasks.splice(tasks.indexOf(p), 1);
    }
    
    function cleanInput(input) {
        input.value = '';
        input.focus();
    }
    
    function valida(input) {
        if (input.value == '') return false;
        if (input.value.length < 3) return false;
        if (input.value.length > 35) return false;
        return true;
    }
    
    function createTask(inputText) {
        const mainDiv = document.querySelector('.container-tasks');
        const div = document.createElement('div');
        const p = document.createElement('p');
        const button = document.createElement('button');
    
        div.classList.add('task');
        button.classList.add('button-remove');
    
        writeTask(inputText, p);
    
        div.appendChild(p);
        div.appendChild(button);
        mainDiv.appendChild(div);
    
    }
    
    
    function writeTask(value, local) {
        local.innerText = `${value}`;
    }

    function addSavedTasks() {
        const savedTasks = localStorage.getItem('savedTasks');
        const tasksSaved = JSON.parse(savedTasks)


        for (tarefa of tasksSaved) {
            createTask(tarefa);
        }
    }
    addSavedTasks();
}());