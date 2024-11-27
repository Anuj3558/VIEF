import { Router } from 'express';
import {
  fetchEvents,
  fetchSchemes,
  fetchAwards,
  fetchSponsors,
  fetchMentors,
  fetchNewsletters,
  fetchStartups,
  fetchEventDetails,
  fetchSchemeDetails,
  fetchGallery,
  fetchContacted,
  submitContact,
} from '../controller/clientController.js';

const clientRouter = Router();

// Define GET routes
clientRouter.get('/events', fetchEvents); //d
clientRouter.get('/scheme', fetchSchemes);//d
clientRouter.get('/awards', fetchAwards);//d
clientRouter.get('/sponsor', fetchSponsors);//d
clientRouter.get('/mentors', fetchMentors);
clientRouter.get('/newsletter', fetchNewsletters);
clientRouter.get('/startups', fetchStartups);//d  
clientRouter.get('/eventdetails', fetchEventDetails);//d
clientRouter.get('/scheme-details', fetchSchemeDetails);//d
clientRouter.get('/gallery', fetchGallery);
clientRouter.post('/contact/submit-contact', submitContact);
clientRouter.get('/contact', fetchContacted);
// Export the router
export default clientRouter;
