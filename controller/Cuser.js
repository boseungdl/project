const {User} = require("../models");

exports.user_register = (req, res) => {
  console.log(req.body)
    User.create(req.body)
    .then((result) => {
      console.log(result)
      res.send(true);
    })
}
exports.user_login = async (req, res) => {
  console.log(req.body);
  let result = await User.findOne({
    where: {
      id: req.body.id
    }
  })
  console.log(result)
  result ? res.send(true) : res.send(false) 
}