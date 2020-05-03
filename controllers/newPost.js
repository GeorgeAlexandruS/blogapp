module.exports = (req, res) =>{
// if session contains user id
  if(req.session.userId){
    return res.render("compose", {
      createPost:true
    });
  }
  // session doesn't contain user id
  res.redirect('/auth/login')
}
