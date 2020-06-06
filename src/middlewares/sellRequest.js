const sellRequest = (req, _res, next) => {
  req.sellRequest = 'sellrequest';
  return next();
};

export default sellRequest;