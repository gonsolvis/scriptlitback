const { Schema, model, SchemaType } = require("mongoose");


const gameSchema = new Schema(
  {

    player: {type: Schema.Types.ObjectId, ref:"User"},
    language:{
        type: String,
        required: true,

    },
    score: {
      type: Number, 
    }, 
  },
  {
    timestamps: true,
  }
);

const User = model("Game", gameSchema);

module.exports = Game;
