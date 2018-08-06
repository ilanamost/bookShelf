<template>
     <section>
                <div class="book-preview flex align-center justify-center flex-column">
                   <div><img class="book_img" :src="(book.imgUrl)? (book.imgUrl) : '../img/placeholder.jpg' " @click="showDetails(book.id)"/></div>
                   <div class="book-preview-data flex align-start justify-center flex-column">
                      <div class="book-preview-data-item"> <span> Author Name: </span> {{book.authorName}} </div>
                      <div class="book-preview-data-item"> <span> Published Date: </span> {{book.publishedDate | moment("D/M/Y")}} </div>
                      <div class="book-preview-data-item"> <span> Title: </span> {{book.bookTitle | titleKeepOnlyLetters| titleToUppercase}} </div>
                   </div>
                   <div class="book-preview-buttons-container flex">
                       <button class="btn btn-warning edit-btn" @click="editBook()">Edit</button>
                       <button class="btn btn-danger delete-btn" @click="deleteBook()">Delete</button>
                   </div>
                </div>
            </section>
</template>

<script>
import bookEdit from "./book-edit.vue";
import EventBusService, {
  BOOK_EDIT_OPEN
} from "../services/EventBusService.js";

export default {
  name: "book-preview",
  props: ["book"],
  methods: {
    editBook() {
      var bookToEdit = Object.assign({}, this.book);
      EventBusService.$emit(BOOK_EDIT_OPEN, bookToEdit);
    },
    deleteBook() {
      swal({
        title: "Are you sure?",
        text: "You can't revert your action",
        icon: "warning",
        buttons: true,
        showCloseButton: true
      }).then(result => {
        if (result) {
          this.$emit("deleteBook", this.book.id);
          swal("Deleted", "You successfully deleted this file", "success");
        } else {
          swal("Cancelled", "Your file is still intact", "info");
        }
      });
    },
    showDetails(bookId) {
      this.$emit("showDetails");
      this.$store.commit({ type: "setSelectedBook", book: this.book });
    }    
  },
  components: {
    bookEdit
  }
};
</script>

<style scoped>
.book_img {
  width: 260px;
  height: 40vh;
  margin-top: 3vh;
  margin-bottom: 3vh;
  border-radius: 10%;
  cursor: pointer;
}

span {
  font-weight: bold;
  margin-left: 2px;
}

.edit-btn {
  margin-top: 10px;
  margin-right: 50px;
  font-family: "sweetCheeks";
  font-size: 18px;
}

.delete-btn {
  margin-top: 10px;
  font-family: "sweetCheeks";
  font-size: 18px;
}

.book-preview-buttons-container {
  margin-bottom: 2vh;
}

.book-preview-data {
  background-color: #fffce0;
  border-radius: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 250px;
}

.btn {
  font-size: 17px;
  font-weight: bold;
}

 .book-preview{
    width: 300px;
    background-color: #2b2626;
    background-size: cover;
    border-radius: 15px;
    box-shadow: -8px 0px 7px #544343;
}
 
</style>
