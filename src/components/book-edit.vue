<template>
    <section class="popup" ref="popup" v-if="isVisible()">
        <button class="custom-button close" @click="doCancel()">x</button>
        <h1 class="edit-book-h1">{{( isInEditMode )? 'Edit Book': 'Add Book'}}</h1>
        <div class="flex">
          <div class="form-errors" v-if="errors.length">
            <b><span class="errors-span">Please correct the following error(s):</span></b>
            <div class="errors-data flex flex-column align-center justify-start">
               <ul class="flex flex-column align-start justify-center">
                 <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
              </ul>
           </div>
         </div>
         <form class='class="form-group books-form flex flex-column align-center justify-center' 
              @submit.prevent="checkForm" novalidate="true">
              <div class="form-data-container flex flex-column align-start">
                  <label> 
                   Author Name:
                  <input type="text" class="form-control" v-model="bookToEdit.authorName" autofocus/>
                  </label>

                  <label> 
                   Published Date:
                  <input type="date" class="form-control" v-model="bookToEdit.publishedDate"/>
                  </label>

                  <label> 
                   Title:
                  <input type="text" class="form-control" v-model="bookToEdit.bookTitle"/>
                 </label>

                  <label> 
                   Genre:
                  <input type="text" class="form-control" v-model="bookToEdit.genre"/>
                 </label>

                  <label> 
                  Description:
                  <textarea class="form-control book-description" v-model="bookToEdit.description" wrap="hard" cols="30"/>
                 </label>

                  <label> 
                   Book Image Url:
                  <input type="text" class="form-control" v-model="bookToEdit.imgUrl" />
                  </label>

              </div>
              <div class="book-edit-buttons-container flex space-around">
                      <button type="submit" class="btn btn-success"> {{( isInEditMode )? 'Save': 'Add'}} </button>
                      <button type="button" class="btn btn-danger" @click="doCancel()">Cancel</button>
              </div>
           </form>
         </div>
    </section>
</template>

<script>
import BookService from "../services/bookService.js";

import EventBusService, {
  BOOK_EDIT_OPEN,
  BOOK_EDIT_CANCEL,
  BOOK_EDIT_CONFIRM,
  BOOK_EDIT_CLOSE
} from "../services/EventBusService.js";

export default {
  data() {
    return {
      bookToEdit: BookService.emptyBook(),
      errors: [],
      visible: false,
      isInEditMode: false
    };
  },
  created() {
    EventBusService.$on(BOOK_EDIT_OPEN, book => {
      this.bookToEdit = book;
      this.visible = true;
      this.isInEditMode = this.checkIfisInEditMode();
    });

    EventBusService.$on(BOOK_EDIT_CLOSE, payload => {
      this.closePopup();
    });
  },
  methods: {
    checkIfisInEditMode() {
      return (
        JSON.stringify(this.bookToEdit) !==
        JSON.stringify(BookService.emptyBook())
      );
    },
    isVisible() {
      return this.visible;
    },
    doCancel() {
      this.errors = [];
      EventBusService.$emit(BOOK_EDIT_CANCEL, this.bookToEdit);
    },
    closePopup() {
      this.visible = false;
    },

    checkForm() {
      this.errors = [];

      this.checkIfAuthorNameNotEmpty(this.bookToEdit.authorName);
      this.checkIfTitleNotEmpty(this.bookToEdit.bookTitle);
      this.checkIfFDateNotEmptyAndValid(this.bookToEdit.publishedDate);
      this.checkIfTitleExists();
      this.checkIfValidUrl(this.bookToEdit.imgUrl);

      if (this.errors.length) return false;
      else EventBusService.$emit(BOOK_EDIT_CONFIRM, this.bookToEdit);
    },

    checkIfFDateNotEmptyAndValid(date) {
      if (!date) {
        this.errors.push("Published Date required.");
      } else if (!this.validDate(date)) {
        this.errors.push("Please enter a valid date.");
      }
    },

    checkIfTitleNotEmpty(title) {
      if (!title) {
        this.errors.push("Title required.");
      }
    },

    checkIfAuthorNameNotEmpty(author) {
      if (!author) {
        this.errors.push("Author Name required.");
      }
    },

    checkIfValidUrl(url) {
      if (url) {
        var regex = new RegExp("(^(http|https)://.{0,})|(.{0,}(.jpg|.png)$)");
        var res = regex.test(url);
        if (!res) this.errors.push("Please enter a valid url.");
      }
    },

    checkIfTitleExists() {
      if (!this.isInEditMode) {
        let books = this.$store.state.books;
        for (var i = 0; i < books.length; i++) {
          var currBook = books[i];
          if (currBook.bookTitle === this.bookToEdit.bookTitle) {
            this.errors.push("Book title already exists.");
            break;
          }
        }
      }
    },

    validDate(date) {
      var dateParts = date.split("-");
      var year = +dateParts[0];
      var month = +dateParts[1];
      var day = +dateParts[2];
      var currDate = new Date();
      var currYear = currDate.getFullYear();
      var currMonth = currDate.getMonth() + 1;
      var currDay = currDate.getDate();

      if (year > currYear) {
        return false;
      } else if (month > currMonth && year === currYear) {
        return false;
      } else if (day > currDay && year === currYear && month === currMonth) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
.popup {
  z-index: 1;
}
h1.edit-book-h1 {
  margin: 0 auto;
  font-weight: bold;
  margin-top: 5px;
}

.book-edit-buttons-container {
  margin-bottom: 2vh;
  width: 100%;
  margin-top: 30px;
}

input {
  border-radius: 25px;
  width: 50vw;
  text-align: center;
}

.btn {
  font-size: 17px;
  font-weight: bold;
}

.books-form {
  margin: 0 auto;
}

.form-errors {
  color: #f49f84;
  font-size: 20px;
}

.form-control {
  width: 30vw !important;
}

.errors-span {
  color: #e74d4d;
}

.errors-data {
  margin-bottom: 15px;
}

.book-description {
  white-space: pre-wrap;
}

@media (max-width: 900px) {
  .form-control {
    width: 50vw !important;
  }
}

@media (max-width: 376px) {
  .errors-span {
    display: none;
  }

  .edit-book-h1 {
    margin-bottom: 0px;
  }

  .form-errors {
    font-size: 16px;
  }

  .form-data-container {
    font-size: 16px;
  }
}

@media (min-width: 319px) {
  .form-errors {
    margin-right: 5%;
  }
}
</style>
