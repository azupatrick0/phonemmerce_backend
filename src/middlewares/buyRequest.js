const buyRequest = (req, _res, next) => {
  req.buyRequest = 'buyrequest';
  return next();
};

export default buyRequest;