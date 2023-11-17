const mongoose = require("mongoose");

const mongoURI =
  "mongodb://gofood:Tergten45@ac-a2jex96-shard-00-00.w8bxqjr.mongodb.net:27017,ac-a2jex96-shard-00-01.w8bxqjr.mongodb.net:27017,ac-a2jex96-shard-00-02.w8bxqjr.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-27741c-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};
mongoose.set("strictQuery", false);

module.exports = mongoDB;
