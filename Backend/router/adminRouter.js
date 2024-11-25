// adminRouter.js
import { Router } from 'express';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  createScheme,
  updateScheme,
  deleteScheme,
  createAward,
  updateAward,
  deleteAward,
  addSponsor,
  updateSponsor,
  deleteSponsor,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  addStartup,
  updateStartup,
  deleteStartup,
  createEventDetails,
  updateEventDetails,
  deleteEventDetails,
  createSchemeDetails,
  updateSchemeDetails,
  deleteSchemeDetails,
  createMember,
  updateMember,
  deleteMember
} from '../controller/adminRouter.js'; // Adjust path if needed
import { upload } from '../cloudinaryConfig.js';

const adminRouter = Router();

// Route definitions
// adminRouter.route('/events').post(createEvent);
// adminRouter.route('/events/:id').put(updateEvent).delete(deleteEvent);

// adminRouter.route('/scheme').post(createScheme);
// adminRouter.route('/scheme/:id').put(updateScheme).delete(deleteScheme);

adminRouter.route('/awards')
    .post(upload.single('image'), createAward)
  

adminRouter.route('/awards/:id')
    .put(upload.single('image'), updateAward)
    .delete(deleteAward);


adminRouter.route('/events')
    .post(upload.single('image'), createEvent)
  

adminRouter.route('/events/:id')
    .put(upload.single('image'), updateEvent)
    .delete(deleteEvent);
// adminRouter.route('/sponsor').post(addSponsor);
// adminRouter.route('/sponsor/:id').put(updateSponsor).delete(deleteSponsor);

adminRouter.route('/members')
    .post(upload.single('image'), createMember)
  

adminRouter.route('/members/:id')
    .put(upload.single('image'), updateMember)
    .delete(deleteMember);
  adminRouter.route('/startups')
    .post(upload.single('image'), addStartup)
  

adminRouter.route('/startups/:id')
    .put(upload.single('image'), updateStartup)
    .delete(deleteStartup);


    adminRouter.route('/sponsors')
    .post(upload.single('image'), addSponsor)
  

adminRouter.route('/sponsors/:id')
    .put(upload.single('image'), updateSponsor)
    .delete(deleteSponsor);
// adminRouter.route('/newsletter').post(createNewsletter);
// adminRouter.route('/newsletter/:id').put(updateNewsletter).delete(deleteNewsletter);

// adminRouter.route('/startups').post(addStartup);
// adminRouter.route('/startups/:id').put(updateStartup).delete(deleteStartup);



export default adminRouter;
