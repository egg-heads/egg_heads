
module.exports = function getEnsureChef() {

  return function ensureChef(req, res, next) {
    if (!req.user.chef) return next({ code: 401, error: 'Hey! You\'re not a chef!'});
    
    next();
  };
};
