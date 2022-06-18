const express = require("express");
const router = express.Router();
const organizationsController = require("../controllers/organizations.controller");

router.post("/organization/create", organizationsController.createOrganization);

router.get("/organization/list", organizationsController.listOrganizations);

router.get(
  "/organization/detail/:id",
  organizationsController.getSingleOrganization
);

router.put(
  "/organization/update/:id",
  organizationsController.updateOrganizations
);

router.delete(
  "/organization/delete/:id",
  organizationsController.deleteOrganizations
);

module.exports = router;
