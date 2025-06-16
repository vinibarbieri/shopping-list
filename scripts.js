const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.querySelector('.shopping-list-items');
const footer = document.querySelector('footer');
const alertButton = document.getElementById('alert-button');

addItemButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    
    if (itemText) {
        const shoppingItem = document.createElement('li');
        shoppingItem.className = 'shopping-item';
        
        shoppingItem.innerHTML = `
            <label class="custom-checkbox">
                <input type="checkbox" class="item-checkbox" />
                <span class="checkmark"><i class="bi bi-check-lg"></i></span>
            </label>
            <span class="item-name">${itemText}</span>
            <button class="delete-button">
                <i class="bi bi-trash"></i>
            </button>
        `;
        
        const deleteButton = shoppingItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            const itemName = shoppingItem.querySelector('.item-name').textContent;
            shoppingItem.remove();
            showConfirmationFooter(itemName);
        });

        const checkbox = shoppingItem.querySelector('.item-checkbox');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                shoppingItem.classList.add('checked-item');
                shoppingList.appendChild(shoppingItem);
            } else {
                shoppingItem.classList.remove('checked-item');
                const firstCheckedItem = shoppingList.querySelector('.checked-item');
                if (firstCheckedItem) {
                    shoppingList.insertBefore(shoppingItem, firstCheckedItem);
                } else {
                    shoppingList.insertBefore(shoppingItem, shoppingList.firstChild);
                }
            }
        });
        
        const firstCheckedItem = shoppingList.querySelector('.checked-item');
        if (firstCheckedItem) {
            shoppingList.insertBefore(shoppingItem, firstCheckedItem);
        } else {
            shoppingList.appendChild(shoppingItem);
        }
        
        itemInput.value = '';
        itemInput.focus();
    }
});

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItemButton.click();
    }
});

function showConfirmationFooter(itemName) {
    footer.style.display = 'flex';
    
    const alertMessage = document.getElementById('alert');
    alertMessage.textContent = `The item "${itemName}" was removed from the list`;
    
    alertButton.addEventListener('click', () => {
        footer.style.display = 'none';
    });
}

document.querySelectorAll('.shopping-item .delete-button').forEach(button => {
    button.addEventListener('click', () => {
        const shoppingItem = button.closest('.shopping-item');
        const itemName = shoppingItem.querySelector('.item-name').textContent;
        shoppingItem.remove();
        showConfirmationFooter(itemName);
    });
});

document.querySelectorAll('.shopping-item .item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const shoppingItem = checkbox.closest('.shopping-item');
        if (checkbox.checked) {
            shoppingItem.classList.add('checked-item');
            shoppingList.appendChild(shoppingItem);
        } else {
            shoppingItem.classList.remove('checked-item');
            const firstCheckedItem = shoppingList.querySelector('.checked-item');
            if (firstCheckedItem) {
                shoppingList.insertBefore(shoppingItem, firstCheckedItem);
            } else {
                shoppingList.insertBefore(shoppingItem, shoppingList.firstChild);
            }
        }
    });
});
