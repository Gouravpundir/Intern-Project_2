const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

// ========================ROUTE HANDLER FOR CREATE INTERN API====================//

const createIntern = async function (req, res) {
  try {
    let internData = req.body;
    if (Object.keys(internData).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Please provide sufficent details in request body",
        });
    }
    let {name,email,mobile}=internData
    if (!name)
      return res.status(400).send({
        status: false,
        msg: "Name is A Mandatory Field,Please Input Name",
      });

      if(mobile.match([/^[6-9]\d{9}$/])){
        return res.status(400).send({
          status: false,
          msg: "please provide valid mobile number",
      })
    }
    if (!email)
      return res.status(400).send({
        status: false,
        msg: "Email is A Mandatory Field,Please Input Email",
      });

    const isEmailAlreadyUsed = await internModel.findOne({ email });
    if (isEmailAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${email} email is already registered`,
      });
      return;
    }

    const isMobileAlreadyUsed = await internModel.findOne({ mobile });
    if (isMobileAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${mobile} mobile is already registered`,
      });
      return;
    }

    let college = await collegeModel.findOne({
      name: internData.collegeName,
      isDeleted: false,
    });
    if (!college)
      return res.status(400).send({
        status: false,
        msg: "No Such College Found,Please Enter A Valid College Name",
      });
    let id = college._id;

    let obj = {
      name: internData.name,
      email: internData.email,
      mobile: internData.mobile,
      collegeId: id,
    };

    let internDataCreated = await internModel.create(obj);
    return res.status(201).send({ status: true, data: internDataCreated});
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, error:error.message });
  }
};

module.exports.createIntern = createIntern;
