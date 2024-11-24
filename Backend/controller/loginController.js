import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';  // Import User model

// Function to handle login
export const login = async (req, res) => {
  try {
    // Destructure the email, password, and username from request body
    const { email, password, username } = req.body;
   console.log(req)
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if username matches
    if (user.username !== username) {
      return res.status(400).json({ message: 'Username does not match' });
    }

    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '7h' });

    // Send response with token
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to create the initial admin user if not already present
export const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingUser = await User.findOne({ email: 'mail-admin@gmail.com' });
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('password-1234', 10);

    // Create new admin user
    const newUser = new User({
      username: 'user-admin',
      email: 'mail-admin@gmail.com',
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Call createAdminUser to insert admin if needed (you can call this in your app startup or database initialization script)
createAdminUser();
