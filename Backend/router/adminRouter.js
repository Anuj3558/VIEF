// // adminRouter.js
// import { Router } from 'express';
// import {
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   createScheme,
//   updateScheme,
//   deleteScheme,
//   createAward,
//   updateAward,
//   deleteAward,
//   addSponsor,
//   updateSponsor,
//   deleteSponsor,
//   addMentor,
//   updateMentor,
//   deleteMentor,
//   createNewsletter,
//   updateNewsletter,
//   deleteNewsletter,
//   addStartup,
//   updateStartup,
//   deleteStartup,
//   createEventDetails,
//   updateEventDetails,
//   deleteEventDetails,
//   createSchemeDetails,
//   updateSchemeDetails,
//   deleteSchemeDetails
// } from '../controller/adminRouter'; // Adjust path if needed

// const adminRouter = Router();

// // Route definitions
// adminRouter.route('/events').post(createEvent);
// adminRouter.route('/events/:id').put(updateEvent).delete(deleteEvent);

// adminRouter.route('/scheme').post(createScheme);
// adminRouter.route('/scheme/:id').put(updateScheme).delete(deleteScheme);

// adminRouter.route('/awards').post(createAward);
// adminRouter.route('/awards/:id').put(updateAward).delete(deleteAward);

// adminRouter.route('/sponsor').post(addSponsor);
// adminRouter.route('/sponsor/:id').put(updateSponsor).delete(deleteSponsor);

// adminRouter.route('/mentors').post(addMentor);
// adminRouter.route('/mentors/:id').put(updateMentor).delete(deleteMentor);

// adminRouter.route('/newsletter').post(createNewsletter);
// adminRouter.route('/newsletter/:id').put(updateNewsletter).delete(deleteNewsletter);

// adminRouter.route('/startups').post(addStartup);
// adminRouter.route('/startups/:id').put(updateStartup).delete(deleteStartup);

// adminRouter.route('/eventdetails').post(createEventDetails);
// adminRouter.route('/eventdetails/:id').put(updateEventDetails).delete(deleteEventDetails);

// adminRouter.route('/scheme-details').post(createSchemeDetails);
// adminRouter.route('/scheme-details/:id').put(updateSchemeDetails).delete(deleteSchemeDetails);

// export default adminRouter;
