import Vue from "vue";
import Vuex from "vuex";

import bookService from "./services/bookService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    selectedBook: null,
  },
  mutations: {
    setBooks(state, { books }) {
      state.books = books;
    },
    addBook(state, { book }) {
      state.books = [book, ...state.books];
    },
    updateBook(state, { book }) {
      const bookIdx = state.books.findIndex(currBook => currBook.id === book.id)
      state.books.splice(bookIdx, 1, book)
    },
    deleteBook(state, { bookId }) {
      state.books = state.books.filter(book => book.id !== bookId)
    },
    setSelectedBook(state, { book }) {
      state.selectedBook = book;
    }
  },
  actions: {
    loadBooks(store) {
      return bookService.getBooks().then(books => {
        store.commit({ type: "setBooks", books });
      });
    },
    addBook(store, {book}) {
      store.commit({type: 'addBook', book});
    },
    editBook(store, {book}) {
      store.commit({type: 'updateBook', book});
    },
    deleteBook(store, {bookId}) {
        var books = bookService.deleteBook(bookId, store.state.books);
        store.commit({type: 'setBooks', books});
    },
    loadBook(store, {bookId}) {
      var book = bookService.getBookById(bookId, store.state.books);
      store.commit({type: 'setSelectedBook', book});
    },
  },
  getters: {
    booksForDisplay(state) {
      if(state.books[0] && state.books[0].id === 1) return state.books.reverse();
      return state.books;
    }
  }
});
