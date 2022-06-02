<template>
  <div class="modal fade" id="bookModal" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form
          @submit.prevent="saveBook"
          novalidate
          :class="submitted ? 'was-validated' : ''"
        >
          <div class="modal-header">
            <h5 class="modal-title">Book details</h5>
            <button
              class="btn-close"
              type="button"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error!</strong>{{ errorMessage }}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                v-model="book.name"
                type="text"
                id="name"
                name="name"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Book name is required.</div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input
                v-model="book.description"
                type="text"
                id="description"
                name="description"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Book description is required.</div>
            </div>
            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input
                v-model="book.quantity"
                type="number"
                min="1"
                step="any"
                id="quantity"
                name="quantity"
                class="form-control"
                required
              />
              <div class="invalid-feedback">
                Quantity is required and should be greater than 0.
              </div>
            </div>
            <div class="form-group">
              <label for="type">Type</label>
              <select
                v-model="book.bookType"
                name="type"
                id="type"
                class="form-select"
                required
              >
                <option value="" selected>Select Book Type</option>
                <option
                  v-for="(type, ind) in bookTypes"
                  :key="ind"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-primary" type="submit">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "../models/book";
import BookType from "../models/bookType";
import BookService from "../services/bookService";
import $ from "jquery";
import { ref } from "vue";

export default {
  name: "book-modal",
  props: {
    selectedBook: { type: Object },
  },
  setup(props, context) {
    const book = ref(new Book());
    const errorMessage = ref("");
    const submitted = ref(false);
    const bookTypes = ref([BookType.FICTION, BookType.NONFICTION]);

    function saveBook() {
      if (
        !book.value.name ||
        !book.value.description ||
        !book.value.quantity ||
        !book.value.description ||
        !book.value.bookType
      ) {
        return;
      }
      BookService.saveBook(book.value)
        .then((response) => {
          context.emit("saved", response.data);
          $("#bookModal").modal("hide");
        })
        .catch((err) => {
          errorMessage.value = "Unexpected error occured.";
          console.log(err);
        });
    }
    function showBookModal() {
      console.log("start of showBookModal");
      //props are immutable objects. Don't use them directly in the form.
      book.value = Object.assign({}, props.selectedBook);
      $("#bookModal").modal("show");
    }

    return {
      book,
      errorMessage,
      submitted,
      bookTypes,
      saveBook,
      showBookModal,
    };
  },
  // data() {
  //   return {
  //     book: new Book(),
  //     errorMessage: "",
  //     submitted: false,
  //     bookTypes: [BookType.FICTION, BookType.NONFICTION],
  //   };
  // },
  // methods: {
  //   saveBook() {
  //     BookService.saveBook(this.book)
  //       .then((response) => {
  //         console.log("saveBook response.data: ", response.data);
  //         this.$emit("saved", response.data);
  //         $("#bookModal").modal("hide");
  //       })
  //       .catch((err) => {
  //         this.errorMessage = "Unexpected error occurred.";
  //         console.log("err: ", err);
  //       });
  //   },
  //   showBookModal() {
  //     // props are immutable objects, do not use them directly in the form
  //     this.book = Object.assign({}, this.selectedBook);
  //     $("#bookModal").modal("show");
  //   },
  // },
};
</script>

<style scoped></style>
