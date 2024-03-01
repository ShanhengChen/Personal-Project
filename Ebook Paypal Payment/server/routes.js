const Router = require('koa-router');
const { createOrder, captureOrder, generateClientToken } = require('./paypal-servcie');
const {getBookUrl} = require('./book-service');
const router = new Router();

router.post('/create_order', async(ctx) =>{
    ctx.body = await createOrder();
});
router.post('/capture_order/:orderId', async (ctx) => {
    const { orderId } = ctx.params;
    const bookUrl = getBookUrl();
    ctx.body = {
      orderData: await captureOrder(orderId),
      bookUrl,

    };
  });

router.get('/client_token', async (ctx) => {
  ctx.body = await generateClientToken();
  });
  
module.exports = router;