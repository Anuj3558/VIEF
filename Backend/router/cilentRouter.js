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
} from '../controller/clientController.js';

const clientRouter = Router();

// Define GET routes
clientRouter.get('/events', fetchEvents);
clientRouter.get('/scheme', fetchSchemes);
clientRouter.get('/awards', fetchAwards);
clientRouter.get('/sponsor', fetchSponsors);
clientRouter.get('/mentors', fetchMentors);
clientRouter.get('/newsletter', fetchNewsletters);
clientRouter.get('/startups', fetchStartups);
clientRouter.get('/eventdetails', fetchEventDetails);
clientRouter.get('/scheme-details', fetchSchemeDetails);

// Export the router
export default clientRouter;
