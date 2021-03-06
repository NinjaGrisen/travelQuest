const express = require("express");
const router = express.Router();
const questController = require("../controllers/questController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", catchErrors(questController.getQuests));
router.get("/quests", catchErrors(questController.getQuests));

router.get("/quests/page/:page", catchErrors(questController.getQuests));

router.get("/quests/:id/edit", catchErrors(questController.editQuest));
router.get(
  "/add",
  authController.isLoggedIn,
  authController.isCreativeOrAdmin,
  questController.addQuest
);
router.post(
  "/add",
  questController.upload,
  catchErrors(questController.resizeImage("quest")),
  catchErrors(questController.resizeImageMedium("quest")),
  catchErrors(questController.resizeImageLarge("quest")),
  catchErrors(questController.createQuest)
);

router.get("/search", catchErrors(questController.searchCity));
router.get("/city/:city", catchErrors(questController.citySearch));

router.get("/city/:city/page/:page", catchErrors(questController.citySearch));

router.get("/city/:city/tags/:tag", catchErrors(questController.citySearch));

router.post(
  "/add/:id",
  questController.upload,
  catchErrors(questController.resizeImage("quest")),
  catchErrors(questController.resizeImageMedium("quest")),
  catchErrors(questController.resizeImageLarge("quest")),
  catchErrors(questController.updateQuest)
);

router.get("/quest/:slug", catchErrors(questController.getQuestBySlug));

router.post(
  "/completedQuest/:id",
  questController.upload,
  catchErrors(questController.resizeImage("completed")),
  catchErrors(questController.resizeImageMedium("completed")),
  catchErrors(questController.resizeImageLarge("completed")),
  catchErrors(questController.removeCompletedBookmark),
  catchErrors(questController.incrementCompletedAmount),
  catchErrors(questController.completeQuest)
);

router.get("/tags", catchErrors(questController.getQuestByTag));

router.get("/tags/:tag", catchErrors(questController.getQuestByTag));

router.get("/tags/:tag/:page", catchErrors(questController.getQuestByTag));

//Login routes
router.get("/login", userController.loginForm);
router.post("/login", authController.login);

router.get("/register", userController.registerForm);
router.post(
  "/register",
  catchErrors(userController.validateRegister),
  userController.register,
  authController.login
);

router.get("/logout", authController.logout);

router.get("/account", authController.isLoggedIn, userController.account);

router.post("/account", catchErrors(userController.updateAccount));

router.post("/account/forgot", catchErrors(authController.forgot));

router.get("/account/reset/:token", catchErrors(authController.reset));

router.post(
  "/account/reset/:token",
  authController.confirmedPassords,
  catchErrors(authController.update)
);

router.get(
  "/bookmarked",
  authController.isLoggedIn,
  catchErrors(questController.getBookmarks)
);

router.get(
  "/bookmarked/:page",
  authController.isLoggedIn,
  catchErrors(questController.getBookmarks)
);

router.get(
  "/completed",
  authController.isLoggedIn,
  catchErrors(questController.getCompletedQuests)
);

//Api end points
router.get("/api/search", catchErrors(questController.searchQuests));

router.post("/api/quests/:id/heart", catchErrors(questController.heartQuest));

router.post(
  "/api/quests/:id/completed",
  catchErrors(questController.completeQuest)
);

module.exports = router;
