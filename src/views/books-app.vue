<template>
  <div class="books">
    <div class="books-header flex align-center justify-end">
        <button class="btn btn-link add-book-btn" @click="addBook()">Add New Book</button>
        <book-edit></book-edit>
    </div>
    <books-list @showDetails="hideList" v-if="showList" @deleteBook="deleteBook" :books="books"></books-list>
    <book-details @close="closeBook"></book-details>
  </div>
</template>

<script>
import booksList from "../components/books-list";
import bookEdit from "../components/book-edit";
import bookDetails from "../components/book-details";

import utilsService from "../services/utilsService.js";
import bookService from "../services/bookService.js";

import EventBusService, {
  BOOK_EDIT_OPEN,
  BOOK_EDIT_CONFIRM,
  BOOK_EDIT_CANCEL,
  BOOK_EDIT_CLOSE
} from "../services/EventBusService.js";

export default {
  name: "books",
  data() {
    return {
        showList: false
      };
    },
  created() {
    this.showList = true;

    bookService.getBooks().then(books => {
      this.$store.dispatch({ type: "loadBooks" }, books);
    });

    EventBusService.$on(BOOK_EDIT_CONFIRM, book => {
      this.modifyBook(book);
      EventBusService.$emit(BOOK_EDIT_CLOSE, null);
    });

    var payload = null;
    EventBusService.$on(BOOK_EDIT_CANCEL, payload => {
        EventBusService.$emit(BOOK_EDIT_CLOSE, null);
    });
  },
  mounted() {},
  methods: {
    addBook() {
      var bookToSave = bookService.emptyBook();
      EventBusService.$emit(BOOK_EDIT_OPEN, bookToSave);
    },
    deleteBook(bookId) {
      this.$store.dispatch({ type: "deleteBook", bookId }).then(() => {});
    },
    modifyBook(bookToSave) {
      var bookToSaveId = utilsService.getNextId(this.books); 
      var isEdit = !! bookToSave.id;
      if(isEdit){
          this.$store.dispatch({ type: "editBook", book: bookToSave });
      } else{
          bookToSave.id = bookToSaveId; 
          this.$store.dispatch({ type: "addBook", book: bookToSave });
      }
    },
    hideList(){
      this.showList = false;
    },

    closeBook(){
      this.showList = true;
      this.$store.commit({ type: "setSelectedBook", book: null });
    }
  },
  computed: {
    books() {
      return this.$store.getters.booksForDisplay;
    }
  },
  components: {
    booksList,
    bookEdit,
    bookDetails
  }
};
</script>

<style>
h1.books-main-header {
  margin-bottom: 5%;
  margin-top: 2%;
  margin-left: 32%;
}

.popup {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background: rgba(87, 94, 133, 0.97);
  color: white;
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  font-family: "sweetCheeks";
  font-size: 24px;
}

.popup .close {
  float: right;
  margin-top: 5px;
  margin-right: 7px;
}

.btn-link.add-book-btn {
    margin-top: 40px;
    font-size: 24px;
    font-family: "sweetCheeks";
    font-weight: bold;
    right: 10%;
    top: 30%;
    text-shadow: 2px 2px 8px #020202;
    color: #33c5b8;
    margin: 0 auto;
    margin-bottom: 3vh;
    margin-top: 6vh;
}

.btn-link.add-book-btn:hover {
  text-decoration: none;
  color: #4caf50;
}

@media (max-width: 340px) {
  .btn-link.add-book-btn {
    font-size: 20px;
  }
}

@media (max-width: 900px) {
  .btn-link.add-book-btn {
    right: 30%;
    top: 12%;
  }
}
</style>
