import Event from "../model/eventSchema.js";
import Partnership from "../model/partnershipSchema.js";
import Startup from "../model/startupSchema.js";
import Award from "../model/awardSchema.js";
import Article from "../model/articleSchema.js";
import Sponsor from "../model/sponsorSchema.js";
import Scheme from "../model/schemeSchema.js";

import Contact from "../model/ContactSchema.js";
import Member from "../model/memberShema.js";
import Gallery from "../model/gallery.js";
import CoworkingSpace from "../model/coworkingSchema.js";
import Blog from "../model/BlogSchems.js";

// Controller for fetching events
export const fetchEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(events);  // Send 200 OK with the events data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching events.' });
  }
};

// Controller for fetching schemes
export const fetchSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(schemes);  // Send 200 OK with the schemes data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching schemes.' });
  }
};

// Controller for fetching awards
export const fetchAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(awards);  // Send 200 OK with the awards data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching awards.' });
  }
};

// Controller for fetching sponsors
export const fetchSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(sponsors);  // Send 200 OK with the sponsors data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching sponsors.' });
  }
};

// Controller for fetching mentors
export const fetchMentors = async (req, res) => {
  try {
    const mentors = await Member.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(mentors);  // Send 200 OK with the mentors data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching mentors.' });
  }
};

// Controller for fetching newsletters
export const fetchNewsletters = async (req, res) => {
  try {
    const newsletters = await Article.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(newsletters);  // Send 200 OK with the newsletters data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching newsletters.' });
  }
};

// Controller for fetching startups
export const fetchStartups = async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(startups);  // Send 200 OK with the startups data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching startups.' });
  }
};

// Controller for fetching event details
export const fetchEventDetails = async (req, res) => {
  try {
    const eventDetails = await Event.findById(req.query.id);  // Fetching event by ID
    res.status(200).json(eventDetails);  // Send 200 OK with the event details data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching event details.' });
  }
};

// Controller for fetching scheme details
export const fetchSchemeDetails = async (req, res) => {
  try {
    const schemeDetails = await Scheme.findById(req.query.id);  // Fetching scheme by ID
    res.status(200).json(schemeDetails);  // Send 200 OK with the scheme details data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching scheme details.' });
  }
};

export const fetchGallery= async (req, res) => {
  try {
    const GalleryData = await Gallery.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(GalleryData||"hii");  // Send 200 OK with the startups data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching startups.' });
  }
};


// Controller for submitting contact form
export const submitContact = async (req, res) => {
  try {
    // Destructure form data from request body
    const { name, type, subject, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !subject || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields. Please check your submission.' 
      });
    }

    // Create new contact submission
    const newContact = new Contact({
      name,
      type: type || 'individual', // Default to individual if not specified
      subject,
      email,
      phone: phone || null, // Optional field
      message,
      status: 'new', // Optional: track submission status
      createdAt: new Date()
    });

    // Save to database
    await newContact.save();

    // Optional: Send response or trigger notification
    res.status(201).json({ 
      message: 'Contact submission received successfully!',
      contactId: newContact._id 
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ 
      message: 'Failed to submit contact. Please try again later.',
      error: error.message 
    });
  }
};

// Controller for fetching contacted submissions (admin use)
export const fetchContacted = async (req, res) => {
  try {
    // Fetch all contact submissions, sorted by most recent
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ 
      message: 'Server error while fetching contact submissions.' 
    });
  }
};
export const fetchCoWorking= async (req, res) => {
  try {
    const coworking = await CoworkingSpace.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(coworking);  // Send 200 OK with the events data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching events.' });
  }
};
export const fetchBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });  // Sorting by 'createdAt' in descending order
    res.status(200).json(blogs);  // Send 200 OK with the events data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching events.' });
  }
};