import { Request, Response, NextFunction } from 'express';

export function validateInput(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;

    // Email validation
    if (email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format. Please provide a valid email address.'
            });
        }
    }

    // Name validation
    if (name) {
        // Check if name contains only letters, spaces, hyphens, and apostrophes
        const nameRegex = /^[a-zA-Z\s-']+$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({
                error: 'Name can only contain letters, spaces, hyphens, and apostrophes.'
            });
        }

        // Check name length (2-50 characters)
        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({
                error: 'Name must be between 2 and 50 characters.'
            });
        }

        // Check for multiple consecutive spaces
        if (name.includes('  ')) {
            return res.status(400).json({
                error: 'Name cannot contain multiple consecutive spaces.'
            });
        }

        // Check if name is just spaces after trimming
        if (name.trim().length < 2) {
            return res.status(400).json({
                error: 'Name must have at least 2 characters after trimming spaces.'
            });
        }
    }

    // Password validation for registration route
    if (req.path === '/register' && password) {
        // Check password length
        if (password.length < 8) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long.'
            });
        }

        // Check for at least one capital letter
        const capitalLetterRegex = /[A-Z]/;
        if (!capitalLetterRegex.test(password)) {
            return res.status(400).json({
                error: 'Password must contain at least one capital letter.'
            });
        }
    }

    next();
}
