document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const isCompleteInput = document.getElementById("isComplete");
  const unreadList = document.getElementById("unreadList");
  const readList = document.getElementById("readList");

  const books = JSON.parse(localStorage.getItem("books")) || [];

  function renderBooks() {
    unreadList.innerHTML = "";
    readList.innerHTML = "";

    books.forEach((book) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${book.title}</strong> - ${book.author} (${
        book.year
      }) 
                            <button class="move-btn" data-id="${
                              book.id
                            }">Pindah ke ${
        book.isComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca"
      }</button>
                            <button class="delete-btn" data-id="${
                              book.id
                            }">Hapus</button>`;
      if (book.isComplete) {
        li.classList.add("completed");
        readList.appendChild(li);
      } else {
        unreadList.appendChild(li);
      }
    });

    setButtonListeners();
  }

  function setButtonListeners() {
    document.querySelectorAll(".move-btn").forEach((button) => {
      button.addEventListener("click", () => moveBook(button.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => deleteBook(button.dataset.id));
    });
  }

  function addBook(event) {
    event.preventDefault();

    const newBook = {
      id: +new Date(),
      title: titleInput.value,
      author: authorInput.value,
      year: parseInt(yearInput.value),
      isComplete: isCompleteInput.checked,
    };

    if (newBook.year < 0) {
      alert("Tahun tidak valid. Mohon masukkan tahun yang benar.");
      return;
    }

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    renderBooks();
    bookForm.reset();
  }

  function moveBook(bookId) {
    const index = books.findIndex((book) => book.id == bookId);
    if (index !== -1) {
      books[index].isComplete = !books[index].isComplete;
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    }
  }

  function deleteBook(bookId) {
    const index = books.findIndex((book) => book.id == bookId);
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    }
  }

  bookForm.addEventListener("submit", addBook);

  renderBooks();
});
