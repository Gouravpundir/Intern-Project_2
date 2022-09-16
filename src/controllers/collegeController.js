const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const validator = require("validator");


// =========================CREATE COLLEGE API===========================//

const createCollege = async function (req, res) {
  try {
    let collegeData = req.body;
    if (Object.keys(collegeData).length == 0){
      return res
        .status(400)
        .send({ status: false, msg: "Please provide sufficent details in request body" });
    }
    if (!collegeData.name)
      return res
        .status(400)
        .send({ status: false, msg: "CollegeName is A Mandatory Field" });

    if (!collegeData.fullName)
      return res
        .status(400)
        .send({ status: false, msg: "College FullName Is A Mandatory Field" });

    if (!collegeData.logoLink)
      return res.status(400).send({
        status: false,
        msg: "Please Provide A College LogoLink,Its A Mandatory Field",
      });
    if (!validator.isURL(collegeData.logoLink))
      return res.status(400).send({ status: false, msg: "Invalid logoLink" });

    let savedCollege = await collegeModel.create(collegeData);
    return res.status(201).send({ status: true, data: savedCollege });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, error:error.message });
  }
};

//========================ROUTE HANDLER FOR GET COLLEGE API==============================//

const getCollegeDetails = async function (req, res) {
  try {
    let collegeData = req.query.collegeName;
    if (!collegeData) {
      res
        .status(400)
        .send({ staus: false, msg: "please provide collage name" });
      return;
    }
    let getCollegeData = await collegeModel
      .findOne({ isDeleted: false, name: collegeData })
      .select({name:1,fullName: 1, logoLink: 1 });
    if (!getCollegeData) {
      res.status(400).send({ status: false, msg: "not valid collage data" });
      return;
    }
    let data = getCollegeData._id;
    let getInterData = await internModel
      .find({ collegeId: data })
      .select({ name: 1, email: 1, mobile: 1 });
      if(getInterData.length==0){
       getInterData="please provide intern details"
      }
    let result = {
      name: getCollegeData.name,
      fullName: getCollegeData.fullName,
      logoLink: getCollegeData.logoLink,
      interns: getInterData,
    };
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, error:error.message});
  }
};

module.exports.createCollege = createCollege;
module.exports.getCollegeDetails = getCollegeDetails;
