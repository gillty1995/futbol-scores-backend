const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validation
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validation for user signup
module.exports.validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email address',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The "password" field must be at least 8 characters long',
      "string.empty": 'The "password" field must be filled in',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

// Validation for user signin
module.exports.validateUserSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email address',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validation for the ID parameter
module.exports.validateId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required().messages({
      "string.length": 'The "id" must be a hexadecimal string of 24 characters',
      "string.hex": 'The "id" must be a valid hexadecimal value',
      "string.empty": 'The "id" field must be filled in',
    }),
  }),
});

//  validation for save game
module.exports.validateGameSave = celebrate({
  body: Joi.object().keys({
    fixtureId: Joi.string().required().messages({
      "string.empty": 'The "fixtureId" field must be filled in',
    }),
    user: Joi.string().required().messages({
      "string.empty": 'The "user" field must be filled in',
    }),
    teams: Joi.object()
      .keys({
        home: Joi.object()
          .keys({
            id: Joi.string().required().messages({
              "string.empty": 'The "home.id" field must be filled in',
            }),
            name: Joi.string().required().messages({
              "string.empty": 'The "home.name" field must be filled in',
            }),
            logo: Joi.string().uri().required().messages({
              "string.uri": 'The "home.logo" field must be a valid URI.',
              "string.empty": 'The "home.logo" field must be filled in',
            }),
          })
          .required(),
        away: Joi.object()
          .keys({
            id: Joi.string().required().messages({
              "string.empty": 'The "away.id" field must be filled in',
            }),
            name: Joi.string().required().messages({
              "string.empty": 'The "away.name" field must be filled in',
            }),
            logo: Joi.string().uri().required().messages({
              "string.uri": 'The "away.logo" field must be a valid URI.',
              "string.empty": 'The "away.logo" field must be filled in',
            }),
          })
          .required(),
      })
      .required(),
    dateTime: Joi.date().required().messages({
      "date.base": 'The "dateTime" field must be a valid date.',
      "date.empty": 'The "dateTime" field must be filled in',
    }),
    status: Joi.string()
      .valid("scheduled", "live", "completed")
      .required()
      .messages({
        "any.only":
          'The "status" field must be one of: scheduled, live, completed.',
        "string.empty": 'The "status" field must be filled in',
      }),
    liveScore: Joi.object().optional().messages({
      "object.base": 'The "liveScore" field must be an object.',
    }),
    liveEvents: Joi.array().optional().messages({
      "array.base": 'The "liveEvents" field must be an array.',
    }),
    league: Joi.object()
      .keys({
        id: Joi.string().required().messages({
          "string.empty": 'The "league.id" field must be filled in',
        }),
        name: Joi.string().required().messages({
          "string.empty": 'The "league.name" field must be filled in',
        }),
      })
      .required(),
  }),
});
