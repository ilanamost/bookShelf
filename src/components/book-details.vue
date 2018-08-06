<template>
     <section v-if="book">
                <li>
                <button class="back-button btn btn-primary" @click="close()">Back</button>
                <!-- <button class=" btn-primary" @click="close()">Back</button> -->
                <div class="book-details flex align-center justify-between flex-row">
                  <!-- <button class="back-button btn-primary" @click="close()">Back</button> -->
                   <div><img class="book-img" :src="(book.imgUrl)? (book.imgUrl) : '../img/placeholder.jpg' "/></div>
                   <div class="book-details-data flex flex-column justify-center align-start">
                    <div class="books-details-top-container">
                      <div class="book-base-data">
                        <div class="book-details-data-item"> <span> Author Name: </span> {{book.authorName}} </div>
                        <div class="book-details-data-item"> <span> Published Date: </span> {{book.publishedDate | moment("D/M/Y")}} </div>
                        <div class="book-details-data-item"> <span> Title: </span> {{book.bookTitle | titleKeepOnlyLetters| titleToUppercase}} </div>
                        <div class="book-details-data-item"> <span> Genre: </span> {{book.genre}} </div>
                      </div>
                      </div>
                      <div class="book-details-data-item"> <span> Description: </span> <p> {{book.description}}</p> </div>
                   </div>
                </div>
                </li>
            </section>
</template>

<script>
export default {
  name: "book-details",
  created() {
    const bookId = +this.$route.params.bookId;
    this.$store.dispatch({ type: "loadBook", bookId });
  },
  destroyed() {
    this.$store.commit({ type: "setSelectedBook", book: null });
  },
  computed: {
    book() {
      return this.$store.state.selectedBook;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
  height: 300px;
  width: 100%;
  text-overflow: ellipsis;
  max-height: 100%;
  text-align: left;
}

.book-img {
  width: 23vw;
  height: 66vh;
  margin-top: 3vh;
  margin-bottom: 3vh;
  margin-right: 26px;
  margin-left: 20px;
  border-radius: 10%;
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

.book-details-data {
  background-color: #fffce0;
  border-radius: 10px;
  width: 30vw;
  height: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  max-height: 500px;
  padding: 10px;
}

.btn {
  font-size: 17px;
  font-weight: bold;
}

.book-details {
  width: 59%;
  height: 72vh;
  background-color: #2b2626;
  background-size: cover;
  border-radius: 15px;
  margin-bottom: 20vh;
  box-shadow: 9px 10px 10px #544343;
  margin: 0 auto;
  font-family: "Gothic";
  font-size: 20px;
  margin-top: 5vh;
}

.back-button{
   cursor: pointer;
   background-color: #24605aed;
   border: none;
   font-family: "sweetCheeks";
   font-size: 18px;
}

.back-button:hover {
    background-color: #14423e;
}

.book-base-data {
  text-align: left;
}

@media (max-width: 900px) {
  .book-details {
    width: 90vw;
  }

  .book-img {
    top: 208px;
    right: 5%;
    height: 15vh;
    width: 20vw;
  }

  .book-details-data {
    width: 100vw;
    margin: 10px;
  }
}

@media (max-width: 415px) {
  .book-img {
    top: 29%;
    right: 4%;
    height: 100px;
    width: 20vw;
    height: 14vh;
  }

  .book-details {
    font-size: 16px;
  }

  .book-base-data {
    text-align: left;
  }

  .book-details-data{
    font-size: 18px;
  }
}

@media (max-width: 361px) {
  .book-base-data {
    margin-top: 8%;
  }

  .book-img {
    margin-top: 40%;
  }
}

@media (max-width: 536px) {
  .book-img {
    display: none;
  }
}

@media (max-width: 377px) {
  .book-base-data {
    margin-top: 25%;
  }
}

@media (max-width: 323px) {
  .book-base-data {
    margin-top: 50%;
  }

  .book-details-data{
    font-size: 16px;
  }
}
</style>
