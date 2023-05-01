module.exports = (req, res, next) => {
  const sales = req.body.some(({ quantity }) => quantity === undefined);
  if (sales) return res.status(400).json({ message: '"quantity" is required' });

  const qntSales = req.body.some(({ quantity }) => quantity < 1);
  if (qntSales) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};
