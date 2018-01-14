function completedQuest(button, form, close) {
    button.on('click', () => {
        displayForm(form);
    });

    close.on('click', () => {
        closeForm(form);
    });
}

function displayForm(form) {
    form.classList.toggle("completed-quest--hidden");
}

function closeForm(form) {
    form.classList.toggle("completed-quest--hidden");
}

export default completedQuest;