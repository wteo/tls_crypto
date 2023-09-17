document.addEventListener('DOMContentLoaded', (event) => {
    const deleteButtons = document.querySelectorAll('.region__admin-delete-button');
    const deleteModal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.modal-close');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    let selectedForm;

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            selectedForm = e.target.closest('form');
            deleteModal.style.display = "block";
        });
    });

    closeModal.addEventListener('click', () => {
        deleteModal.style.display = "none";
    });

    confirmDeleteButton.addEventListener('click', () => {
        if (selectedForm) {
            selectedForm.submit();
        }
        deleteModal.style.display = "none";
    });

    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == deleteModal) {
            deleteModal.style.display = "none";
        }
    });
});
