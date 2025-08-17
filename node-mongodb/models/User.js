const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number, // Assuming phone is a number
  status: String // Assuming status is a string
});
const User = mongoose.model("User", userSchema);