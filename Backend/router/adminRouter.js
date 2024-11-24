import { Router } from 'express';

const adminRouter = Router();

// Route definitions
adminRouter
  .route('/events')
  .post((req, res) => {
    res.json({ message: 'Creating an event...' });
  });

adminRouter
  .route('/events/:id')
  .put((req, res) => {
    res.json({ message: `Updating event with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting event with ID ${req.params.id}...` });
  });

adminRouter
  .route('/scheme')
  .post((req, res) => {
    res.json({ message: 'Creating a scheme...' });
  });

adminRouter
  .route('/scheme/:id')
  .put((req, res) => {
    res.json({ message: `Updating scheme with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting scheme with ID ${req.params.id}...` });
  });

adminRouter
  .route('/awards')
  .post((req, res) => {
    res.json({ message: 'Creating an award...' });
  });

adminRouter
  .route('/awards/:id')
  .put((req, res) => {
    res.json({ message: `Updating award with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting award with ID ${req.params.id}...` });
  });

adminRouter
  .route('/sponsor')
  .post((req, res) => {
    res.json({ message: 'Adding a sponsor...' });
  });

adminRouter
  .route('/sponsor/:id')
  .put((req, res) => {
    res.json({ message: `Updating sponsor with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting sponsor with ID ${req.params.id}...` });
  });

adminRouter
  .route('/mentors')
  .post((req, res) => {
    res.json({ message: 'Adding a mentor...' });
  });

adminRouter
  .route('/mentors/:id')
  .put((req, res) => {
    res.json({ message: `Updating mentor with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting mentor with ID ${req.params.id}...` });
  });

adminRouter
  .route('/newsletter')
  .post((req, res) => {
    res.json({ message: 'Creating a newsletter...' });
  });

adminRouter
  .route('/newsletter/:id')
  .put((req, res) => {
    res.json({ message: `Updating newsletter with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting newsletter with ID ${req.params.id}...` });
  });

adminRouter
  .route('/startups')
  .post((req, res) => {
    res.json({ message: 'Adding a startup...' });
  });

adminRouter
  .route('/startups/:id')
  .put((req, res) => {
    res.json({ message: `Updating startup with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting startup with ID ${req.params.id}...` });
  });

adminRouter
  .route('/eventdetails')
  .post((req, res) => {
    res.json({ message: 'Creating event details...' });
  });

adminRouter
  .route('/eventdetails/:id')
  .put((req, res) => {
    res.json({ message: `Updating event details with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting event details with ID ${req.params.id}...` });
  });

adminRouter
  .route('/scheme-details')
  .post((req, res) => {
    res.json({ message: 'Creating scheme details...' });
  });

adminRouter
  .route('/scheme-details/:id')
  .put((req, res) => {
    res.json({ message: `Updating scheme details with ID ${req.params.id}...` });
  })
  .delete((req, res) => {
    res.json({ message: `Deleting scheme details with ID ${req.params.id}...` });
  });

// Export the router
export default adminRouter;
