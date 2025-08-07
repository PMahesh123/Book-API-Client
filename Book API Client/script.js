document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'http://localhost:3000/books';
    
    // Get all books
    document.getElementById('getBooks').addEventListener('click', async function() {
        try {
            const response = await fetch(baseUrl);
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Add a new book
    document.getElementById('addBook').addEventListener('click', async function() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
            });
            const newBook = await response.json();
            alert(`Book added with ID: ${newBook.id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Update a book
    document.getElementById('updateBook').addEventListener('click', async function() {
        const id = document.getElementById('updateId').value;
        const title = document.getElementById('updateTitle').value;
        const author = document.getElementById('updateAuthor').value;
        
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
            });
            const updatedBook = await response.json();
            alert(`Book updated: ${updatedBook.title}`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Delete a book
    document.getElementById('deleteBook').addEventListener('click', async function() {
        const id = document.getElementById('deleteId').value;
        
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
            });
            const deletedBook = await response.json();
            alert(`Book deleted: ${deletedBook[0].title}`);
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Display books in the UI
    function displayBooks(books) {
        const booksList = document.getElementById('booksList');
        booksList.innerHTML = '';
        
        if (books.length === 0) {
            booksList.innerHTML = '<p>No books found</p>';
            return;
        }
        
        const list = document.createElement('ul');
        books.forEach(book => {
            const item = document.createElement('li');
            item.textContent = `${book.id}: ${book.title} by ${book.author}`;
            list.appendChild(item);
        });
        booksList.appendChild(list);
    }
});