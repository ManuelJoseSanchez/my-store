const { Router } = require('express');

const router = Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
      categoryId,
      productId,
  });
});



module.exports = router;
