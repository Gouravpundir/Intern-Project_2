const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

// ========================ROUTE HANDLER FOR CREATE INTERN API====================//

const createIntern = async function (req, res) {
  try {
    if (req.body && Object.keys(req.body).length >0){
let college=await collegeModel.findOne({name:req.body.collegeName,isDeleted:false})
if(!college){
  res.status(400).send({status:false,msg:"Request must contain a body"})
}else{
    let internData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      collegeId: college._id
    };

    let intern = await internModel.create(internData);
    return res.status(201).send({ status: true, data: intern});
  }
  }else{
    res.status(400).send({status:false,msg:"Request must contain a valid body"})
  }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, error:error.message });
  }
}

module.exports.createIntern = createIntern;
