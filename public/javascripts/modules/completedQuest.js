function completedQuest(button, form, close) {
    button.on('click', () => {
        displayForm(form);
    });

    close.on('click', () => {
        closeForm(form);
    });
}

function displayForm(form) {
    console.log(form.classList);
    form.classList.toggle("completed-quest--hidden");
}

function closeForm(form) {
    console.log(form.classList);
    form.classList.toggle("completed-quest--hidden");
}

export default completedQuest;