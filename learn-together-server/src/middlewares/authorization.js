const teacherAuthorization = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "teacher") {
    return res
      .status(401)
      .send({ message: "You are not authorized to do this action" });
  }
  next();
};

module.exports = {
  teacherAuthorization,
};
