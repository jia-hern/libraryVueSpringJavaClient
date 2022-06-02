<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Books</h3>
            </div>

            <div class="col-6 text-end">
              <button class="btn btn-primary" @click="createBookRequest">
                Create Book
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Book description</th>
                <th scope="col">Book quantity</th>
                <th scope="col">Book Type</th>
                <th scope="col">Book Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(book, ind) in bookList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ book.name }}</td>
                <td>{{ book.description }}</td>
                <td>{{ book.quantity }}</td>
                <td>{{ book.bookType }}</td>
                <td>{{ new Date(book.createTime).toLocaleDateString() }}</td>
                <td>
                  <button
                    class="btn btn-primary me-1"
                    @click="editBookRequest(book)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="deleteBookRequest(book, ind)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <book-modal
    ref="bookModal"
    :selected-book="selectedBook"
    @saved="bookSaved"
  />

  <book-delete-modal ref="deleteBookModal" @confirmed="deleteBook" />
</template>

<script>
import BookService from "../services/bookService";
import BookModal from "../components/Book.vue";
import Book from "../models/book";
import { nextTick } from "vue";
import BookDeleteModal from "../components/BookDeleteConfirm";

export default {
  name: "admin",
  components: { BookModal, BookDeleteModal },
  data() {
    return {
      bookList: [],
      selectedBook: new Book(),
      errorMessage: "",
      selectedIndex: undefined,
    };
  },
  mounted() {
    BookService.getAllBooks().then((response) => {
      this.bookList = response.data;
    });
  },
  methods: {
    createBookRequest() {
      this.selectedBook = new Book();
      console.log("this.selectedBook: ", this.selectedBook);
      // use next tick to ensure data is ready
      nextTick(() => {
        this.$refs["bookModal"].showBookModal();
      });
    },
    editBookRequest(book) {
      this.selectedBook = Object.assign({}, book);
      // use next tick to ensure data is ready
      nextTick(() => {
        this.$refs["bookModal"].showBookModal();
      });
    },
    deleteBookRequest(book, ind) {
      this.selectedBook = book;
      this.selectedIndex = ind;
      nextTick(() => {
        this.$refs["deleteBookModal"].showDeleteModal();
      });
    },
    bookSaved(book) {
      const itemIndex = this.bookList.findIndex((item) => item.id === book.id);
      if (itemIndex !== -1) {
        // update
        this.bookList[itemIndex] = book;
      } else {
        // create
        this.bookList.push(book);
      }
    },
    deleteBook() {
      BookService.deleteBook(this.selectedBook)
        .then(() => {
          this.bookList.splice(this.selectedIndex, 1);
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occured.";
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
