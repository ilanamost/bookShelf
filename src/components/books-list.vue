<template>
     <section class="books-list">
            <div class="books-list">
              <carousel :perPageCustom="[[0, 1], [320, 1], [480, 1], [760, 2], [1024, 3]]" :scrollPerPage="true">
                <slide v-for="book in books" :book="book" :key="book.id">
                   <book-preview class="book-preview" :book="book" @deleteBook="deleteBook(book.id)" @showDetails="showDetails()">
                   </book-preview>
                </slide>
              </carousel>
            </div>
        </section>
</template>

<script>
import bookPreview from "./book-preview";

export default {
  name: "books-list",
  props: ["books"],
  methods: {
    deleteBook(bookId) {
      this.$emit("deleteBook", bookId);
    },
    showDetails() {
      this.$emit("showDetails");
    }
  },
  components: {
    bookPreview
  }
};
</script>

<style scoped>

.books-list {
  font-family: "Gothic";
  font-size: 20px;
}

.book-preview{
  margin: 0 auto;
}

</style>
