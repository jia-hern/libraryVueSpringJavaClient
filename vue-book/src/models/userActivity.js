export default class UserActivity {
  constructor(userId, bookId, userActivityType, activityTime, id) {
    this.userId = userId;
    this.bookId = bookId;
    this.userActivityType = userActivityType;
    this.activityTime = activityTime;
    this.id = id;
  }
}
