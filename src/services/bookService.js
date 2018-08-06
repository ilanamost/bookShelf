import utilsService from "./utilsService.js";

const FILE_NAME = "books";

function emptyBook() {
  return { id: 0, authorName: "", publishedDate: "", bookTitle: "", imgUrl: "" };
}

function getBooks() {  
   return utilsService.loadJSON(FILE_NAME).then(books => {
       return books;
    });
}

function getBookById(bookId, books) {
    let book = books.find(book => {
      return (book.id = bookId);
    });
    return book;
}

function deleteBook(bookId, books) {
    var filteredBooks = books.filter(book => book.id !== bookId);
    return filteredBooks;
}

export default {
  emptyBook,
  getBooks,
  getBookById,
  deleteBook
};
