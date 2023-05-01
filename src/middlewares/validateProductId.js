module.exports = (req, res, next) => {
  const sales = req.body;

  const checked = sales.map(({ productId }) => {
    if (productId === undefined) return true;
    
    return false;
  });

  if (checked.some((e) => e === true)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};
