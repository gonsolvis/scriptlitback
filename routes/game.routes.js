
const express = require("express");
const router = express.Router();
const User = require("../models/User.model")

router.post("/newgame", (req, res, next) =>{
   const {player, language, score}= req.body;
   Game.create({
    player, language, score
   })
   .then((newgame)=>{
    res.json(newgame);
   })
   .catch((err)=>next(err));
});

router.get("/:id", (req,res,next)=>{
    const { id } = req.params;
    Game.findbyId(id)
    .populate ("User")
    .then((usergames)=>{
        res.json(usergames);
    })
    .catch((err) => next(err));
})

router.delete("/:idgame/delete", (req,res,next) =>{
    const {idgame} = req.params;
    Game.findbyIdandDelete(idgame)
    .then((response)=>{
         res.json(response)
    })
    .catch((err)=>next(err))
})
module.exports = router;