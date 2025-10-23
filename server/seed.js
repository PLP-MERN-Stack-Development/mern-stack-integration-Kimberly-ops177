import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import connectDB from './config/db.js';

dotenv.config();

const seedCategories = async () => {
  try {
    await connectDB();
    
    // Clear existing categories
    await Category.deleteMany({});
    
    // Create categories
    const categories = [
      { name: 'Technology', description: 'Posts about technology and innovation' },
      { name: 'Lifestyle', description: 'Posts about lifestyle and daily living' },
      { name: 'Travel', description: 'Posts about travel and adventures' },
      { name: 'Food', description: 'Posts about food and recipes' },
      { name: 'Business', description: 'Posts about business and entrepreneurship' },
      { name: 'Health', description: 'Posts about health and wellness' }
    ];
    
    await Category.insertMany(categories);
    
    console.log('✅ Categories seeded successfully');
    console.log('Categories created:', categories.map(c => c.name).join(', '));
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedCategories();
