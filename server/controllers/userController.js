const Physician = require("../models/Physician");
const Meal = require("../models/Meal");
const Schedule = require("../models/Schedule");
const Medical = require("../models/Medical");
const Medication = require("../models/Medication");
const User = require("../models/User");
const jwt = require('jsonwebtoken');




// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

// incorrect email
if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
}

// incorrect password
if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
}

// duplicate error code
if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
}

    // validation errors
if (err.message.includes('register validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
        // console.log(error.properties);
        errors[properties.path] = properties.message;
    })
}
return errors;
}

// Token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  // console.log('SECRET:', process.env.JWT_SECRET);
  return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: maxAge
  });
    // return jwt.sign({ id }, 'careMemo application secret', {
    //     expiresIn: maxAge
    // });
};


// USER ROUTES FOR LOGIN
module.exports.getSignUp = (req, res) => {
  // res.render('signUp');
  // res.json('signUp');
  res.json({ message: 'success getting signup' });
}

module.exports.createSignUp = async (req, res) => {
  const { email, password } = req.body;
  
  try {
      const newUser = await User.create({ email, password });
      const token = createToken(newUser._id);
      res.cookie('jwt', token, {
        httpOnly:true, 
        sameSite: 'lax',
        secure: false,
        maxAge: maxAge * 1000
      });
      res.status(201).json({user: newUser._id});
  }
  catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
  }
}

// User Authentication GET
module.exports.getLogin = (req, res) => {
  // res.render('Login');
  res.json({ message: 'success getting logging in' });
}

// User Authentication POST
module.exports.createLogin = async  (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly:true,
        sameSite: 'lax',
        secure: false,
        maxAge: maxAge * 1000
      });
      res.status(200).json({user: user._id});

  }
  catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
  }

}

// User Authentication Logout
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly:true, 
    maxAge: 1
  })
  res.status(200).json({message: 'logged out'});
  // res.cookie('jwt', '', {maxAge: 1});
  // res.redirect('/');
};


//GET ROUTE FOR MEALS
module.exports.getLanding = (req, res) => {
    res.json({ message: 'success landing get' });
}

// GET ROUTE FOR SCHEDULE
module.exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find();
   res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedule'})
  }
};


// POST TO CREATE SCHEDULE
module.exports.createSchedule = async (req, res) => {
  try {
    const newSchedule = await Schedule.create(req.body); // save the data
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


    // GET ROUTE FOR PHYSICIANS
    // Import physician model
module.exports.getPhysician = async (req, res) => {
    try {
        const physicians = await Physician.find();
        res.json(physicians);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch physicians'});
    }
};

// POST TO CREATE PHYSICIAN
module.exports.createPhysician = async (req, res) => {
  try {
    const newPhysician = await Physician.create(req.body); // save the data
    res.status(201).json(newPhysician);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// GET ROUTE FOR MEALS
 // Import meal model
module.exports.getMeal = async (req, res) => {
  try {
    // MUST HAVE router.get listMeals
    const listMeals = await Meal.find();
    res.json(listMeals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listMeals'});
  }
};

// POST ROUTE FOR MEALS
// MUST HAVE userController.createMeal
module.exports.createMeal = async (req, res) => {
  console.log(req.body);
  try {
    const newMeal = await Meal.create(req.body);
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ROUTE FOR MEDICAL ALERT
// REMEMBER TO IMPORT MEDICAL FROM MODELS
module.exports.getMedicalAlert = async (req, res) => {
  try {
    const medicalAlertData = await Medical.find();
   res.json(medicalAlertData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medical'})
  }
};

// POST TO CREATE MEDICAL ALERT
module.exports.createMedicalAlert = async (req, res) => {
  try {
    const newMedicalAlertData = await Medical.create(req.body); // save the data
    res.status(201).json(newMedicalAlertData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ROUTE FOR MEDICATION
// REMEMBER TO IMPORT MEDICATION FROM MODELS
module.exports.getMedication = async (req, res) => {
  try {
    const medicationList = await Medication.find();
   res.json(medicationList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medication'})
  }
};

// POST TO CREATE MEDICATION
module.exports.createMedication = async (req, res) => {
  try {
    const newMedication = await Medication.create(req.body); // save the data
    res.status(201).json(newMedication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE ITEM BY ID
module.exports.deleteItem = (Model) => async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Model.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: `Item with id ${id} not found` });
    }

    res.status(200).json({ message: "Deleted successfully", data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
};

// Added

module.exports.checkUser = (req, res) => {
  // console.log('Cookies:', req.cookies);
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};