<template>
  <div class="container">
    <div class="pt-5">
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All User Activity</h3>
            </div>
            <div class="col-6 text-end">
              Current role is <strong>{{ currentUser?.role }}</strong>
              <button class="btn btn-primary" @click="changeRole">
                Change Role
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
                <th scope="col">Book Type</th>
                <th scope="col">Book Quantity</th>
                <th scope="col">User Activty Type</th>
                <th scope="col">User Activity Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, ind) in userActivityList" :key="ind">
                <th scope="row">{{ ind + 1 }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.userActivityType }}</td>
                <td>
                  {{ new Date(item.activityTime).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vuex from "vuex";
import Role from "../models/role";
import userActivityService from "../services/userActivityService";
import UserService from "../services/userService";

export default {
  name: "profile",
  data() {
    return {
      userActivityList: [],
      errorMessage: "",
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    userActivityService.getAllUserActivityOfUser().then((response) => {
      this.userActivityList = response.data;
      console.log("userActivityList contains: ", this.userActivityList);
    });
  },
  methods: {
    ...vuex.mapActions(["clearUser"]),
    changeRole() {
      const newRole =
        this.currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

      UserService.changeRole(newRole)
        .then(() => {
          this.clearUser();
          this.$router.push("/login");
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
