import { body, validationResult } from 'express-validator';

export const validateTask = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 4, max: 50 })
    .withMessage('Title must be between 4 and 50 characters long')
    .trim(),
  
  body('description')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 4, max: 500 })
    .withMessage('Description must be between 4 and 500 characters long')
    .optional({ checkFalsy: true }),

  body('status')
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of "pending", "in-progress", or "completed"')
    .optional({ checkFalsy: true }),

  body('userId')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB ObjectId')
    .notEmpty()
    .withMessage('User ID is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


export const validateUser = [
  body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 2 characters long'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLoginData = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
