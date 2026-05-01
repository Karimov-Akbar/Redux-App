import {
    userStore,
    addUser,
    deleteUser,
    selectUser,
    closeDialog,
    updateAddress,
} from '@/entities/user';

export function renderUserList(rootElement) {
    function render() {
        const state = userStore.getState();
        rootElement.innerHTML = '';

        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add User';
        addBtn.addEventListener('click', addUser);
        rootElement.appendChild(addBtn);

        if (state.users.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'No users yet. Click "Add User" to fetch one.';
            rootElement.appendChild(empty);
        } 
        else {
            const table = document.createElement('table');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const thUsername = document.createElement('th');
            thUsername.textContent = 'Username';
            headerRow.appendChild(thUsername);

            const thAddress = document.createElement('th');
            thAddress.textContent = 'Address';
            headerRow.appendChild(thAddress);

            const thEmail = document.createElement('th');
            thEmail.textContent = 'Email';
            headerRow.appendChild(thEmail);

            const thActions = document.createElement('th');
            thActions.textContent = 'Actions';
            headerRow.appendChild(thActions);

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            state.users.forEach((user) => {
                const tr = document.createElement('tr');
                tr.addEventListener('click', () => selectUser(user.id));

                const tdUsername = document.createElement('td');
                tdUsername.textContent = user.username;
                tr.appendChild(tdUsername);

                const tdAddress = document.createElement('td');
                tdAddress.textContent = user.address;
                tr.appendChild(tdAddress);

                const tdEmail = document.createElement('td');
                tdEmail.textContent = user.email;
                tr.appendChild(tdEmail);

                const tdActions = document.createElement('td');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteUser(user.id);
                });
                tdActions.appendChild(deleteBtn);
                tr.appendChild(tdActions);

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            rootElement.appendChild(table);
        }

        if (state.selectedUser) {
            renderDialog(rootElement, state.selectedUser);
        }
    }

    userStore.subscribe(render);
    render();
}

function renderDialog(rootElement, user) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDialog();
        }
    });

    const dialog = document.createElement('div');
    dialog.className = 'dialog';

    const title = document.createElement('h3');
    title.textContent = 'User Info';
    dialog.appendChild(title);

    const pUsername = document.createElement('p');
    pUsername.innerHTML = '<strong>Username:</strong> ' + user.username;
    dialog.appendChild(pUsername);

    const pName = document.createElement('p');
    pName.innerHTML = '<strong>Name:</strong> ' + user.name;
    dialog.appendChild(pName);

    const pSex = document.createElement('p');
    pSex.innerHTML = '<strong>Sex:</strong> ' + user.sex;
    dialog.appendChild(pSex);

    const pEmail = document.createElement('p');
    pEmail.innerHTML = '<strong>Email:</strong> ' + user.email;
    dialog.appendChild(pEmail);

    const pBirthday = document.createElement('p');
    pBirthday.innerHTML = '<strong>Birthday:</strong> ' + user.birthday;
    dialog.appendChild(pBirthday);

    const addressLabel = document.createElement('label');
    const addressStrong = document.createElement('strong');
    addressStrong.textContent = 'Address:';
    addressLabel.appendChild(addressStrong);

    const addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.value = user.address;
    addressInput.id = 'address-input';
    addressLabel.appendChild(addressInput);
    dialog.appendChild(addressLabel);

    const btnContainer = document.createElement('div');
    btnContainer.className = 'dialog-buttons';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
        const newAddress = document.getElementById('address-input').value;
        updateAddress(user.id, newAddress);
    });
    btnContainer.appendChild(saveBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', closeDialog);
    btnContainer.appendChild(cancelBtn);

    dialog.appendChild(btnContainer);
    overlay.appendChild(dialog);
    rootElement.appendChild(overlay);
}