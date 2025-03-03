import Joi from "joi";



const validateUserInfo = (data)=>{
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    gender: Joi.string().min(4).max(225).required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().email().required(),
    phone: Joi.string().allow(null)
  });

  
  return schema.validate(data);
}








export default validateUserInfo;