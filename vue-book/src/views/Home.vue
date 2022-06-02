<template>
  <div class="container p-3">
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="infoMessage" class="alert alert-success">
      {{ infoMessage }}
    </div>
    <div class="d-flex flex-wrap">
      <div
        v-for="(book, ind) in bookList"
        :key="ind"
        class="card m-3"
        style="width: 300px; background-color: #f6f6f6"
      >
        <div class="card-body">
          <h5 class="card-title text-uppercase">Book Name: {{ book.name }}</h5>
          <h6 class="card-subtitle text-muted">
            Description: {{ book.description }}
          </h6>
          <h6 class="card-subtitle text-muted">
            Quantity: {{ book.quantity }}
          </h6>
          <h6 class="card-subtitle text-muted">
            Book Type: {{ book.bookType }}
          </h6>
        </div>

        <font-awesome-icon
          :icon="iconByBookType(book.bookType)"
          class="ms-auto me-auto mt-3 book-icon"
        />

        <div class="row mt-2 p-3">
          <div class="col-6 mt-2 ps-4">Available</div>
          <div class="col">
            <button
              class="btn btn-outline-success w-100"
              @click="borrowBook(book.id)"
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from "../services/bookService";
import vuex from "vuex";
import UserActivity from "../models/userActivity";
import UserActivityService from "../services/userActivityService";
import BookType from "../models/bookType";
import UserActivityType from "../models/userActivityType";

export default {
  name: "home",
  data() {
    return {
      bookList: [],
      errorMessage: "",
      infoMessage: "",
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    BookService.getAllBooks().then((response) => {
      this.bookList = response.data;
    });
  },
  methods: {
    iconByBookType(type) {
      switch (type) {
        case BookType.FICTION:
          return "book-open";
        case BookType.NONFICTION:
          return "book";
      }
    },
    borrowBook(bookId) {
      if (!this.currentUser?.id) {
        this.errorMessage = "You should log in to borrow a book";
        return;
      }
      const userActivity = new UserActivity(
        this.currentUser.id,
        bookId,
        UserActivityType.BORROW
      );

      UserActivityService.saveUserActivity(userActivity)
        .then(() => {
          this.infoMessage = "save user activity success.";
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occurred.";
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.book-icon {
  font-size: 100px;
  color: darkblue;
}
</style>
