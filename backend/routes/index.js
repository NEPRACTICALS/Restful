const { Router } = require("express");
const { AuthRoutes} = require("./AuthRoutes");
const auth = require("../middleware/auth");
const { BookRoutes } = require("./BookRoutes");

// routes of th whole app 

const router  = Router()

router.use(
  "/auth",
  AuthRoutes
  /* 
  #swagger.tags = ['Auth']*/
);

router.use(

  BookRoutes
  /* 
  #swagger.tags = ['Book']
  #swagger.security = [{
            "bearerAuth": []
}]
  */
);

module.exports.router = router;