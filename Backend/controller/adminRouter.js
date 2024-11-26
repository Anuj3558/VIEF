import Award from "../model/awardSchema.js";
import { deleteFromCloudinary,getPublicIdFromUrl } from "../cloudinaryConfig.js";
import Event from "../model/eventSchema.js";
import Member from "../model/memberShema.js";
import Startup from "../model/startupSchema.js";
import Sponsor from "../model/sponsorSchema.js";
import Scheme from "../model/schemeSchema.js";
import Gallery from "../model/gallery.js";
import Article from "../model/articleSchema.js";
import Contact from "../model/ContactSchema.js";
// adminController.js

export const createEvent = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'Image file is required' });
      }

      const newEvent = new Event({
          title: req.body.title,
          date: new Date(req.body.date),
          description: req.body.description,
          mode: req.body.mode,
          image: req.file.path,
          url:req.body.nameUrl // Cloudinary URL from multer
      });

      const savedEvent = await newEvent.save();
      
      res.status(201).json({
          success: true,
          data: savedEvent,
          message: 'Event created successfully'
      });
  } catch (error) {
    console.log(error)
      // Clean up uploaded image if there's an error
      if (req.file?.path) {
          await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
      }
      
      res.status(500).json({
          success: false,
          message: 'Error creating event',
          error: error.message
      });
  }
};

export const updateEvent = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: 'Invalid event ID' });
      }

      const existingEvent = await Event.findById(id);
      if (!existingEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }

      let updateData = {
          title: req.body.title,
          date: new Date(req.body.date),
          description: req.body.description,
          mode: req.body.mode,
          url:req.body.nameUrl  
      };

      // Handle image update if new file is uploaded
      if (req.file) {
          // Delete old image from Cloudinary
          if (existingEvent.image) {
              await deleteFromCloudinary(getPublicIdFromUrl(existingEvent.image));
          }
          updateData.image = req.file.path;
      }

      const updatedEvent = await Event.findByIdAndUpdate(
          id,
          { $set: updateData },
          { new: true, runValidators: true }
      );

      res.json({
          success: true,
          data: updatedEvent,
          message: 'Event updated successfully'
      });
  } catch (error) {
      // Clean up uploaded image if there's an error
      if (req.file?.path) {
          await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
      }

      res.status(500).json({
          success: false,
          message: 'Error updating event',
          error: error.message
      });
  }
};

export const deleteEvent = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: 'Invalid event ID' });
      }

      const event = await Event.findById(id);
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Delete image from Cloudinary first
      if (event.image) {
          await deleteFromCloudinary(getPublicIdFromUrl(event.image));
      }

      // Delete the event document
      await event.deleteOne();

      res.json({
          success: true,
          message: 'Event deleted successfully'
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error deleting event',
          error: error.message
      });
  }
};

  
export const createScheme = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
      console.log(req.body);
        const newScheme = new Scheme({
            title: req.body.title,
            image: req.file.path,
            deadline: new Date(req.body.deadline),
            url: req.body.applyButtonLink,
            description:req.body.description
        });

        const savedScheme = await newScheme.save();
        
        res.status(201).json({
            success: true,
            data: savedScheme,
            message: 'Scheme created successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating scheme',
            error: error.message
        });
    }
};

export const updateScheme = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid scheme ID' });
        }

        const existingScheme = await Scheme.findById(id);
        if (!existingScheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }

        let updateData = {
            title: req.body.title,
            image: req.file.path,
            deadline: new Date(req.body.deadline),
            url: req.body.applyButtonLink,
            description:req.body.description
        };

        // Handle image update if new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            if (existingScheme.image) {
                await deleteFromCloudinary(getPublicIdFromUrl(existingScheme.image));
            }
            updateData.image = req.file.path;
        }

        const updatedScheme = await Scheme.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updatedScheme,
            message: 'Scheme updated successfully'
        });
    } catch (error) {
        console.log(error)
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }

        res.status(500).json({
            success: false,
            message: 'Error updating scheme',
            error: error.message
        });
    }
};

export const deleteScheme = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid scheme ID' });
        }

        const scheme = await Scheme.findById(id);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }

        // Delete image from Cloudinary first
        if (scheme.image) {
            await deleteFromCloudinary(getPublicIdFromUrl(scheme.image));
        }

        // Delete the scheme document
        await scheme.deleteOne();

        res.json({
            success: true,
            message: 'Scheme deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting scheme',
            error: error.message
        });
    }
};
  
  export const createAward = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newAward = new Award({
            title: req.body.title,
            recipient: req.body.recipient,
            description: req.body.description,
            subtitle: req.body.subtitle,
            image: req.file.path // Cloudinary automatically provides the URL in req.file.path
        });
       console.log(newAward)
        const savedAward = await newAward.save();
        console.log(savedAward)
        res.status(201).json({
            success: true,
            data: savedAward,
            message: 'Award created successfully'
        });
    } catch (error) {
        // If there's an error, we might need to clean up the uploaded image
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }
        console.log(error)
        
        res.status(500).json({
            success: false,
            message: 'Error creating award',
            error: error.message
        });
    }
};

// Update existing award
export const updateAward = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid award ID' });
        }

        const existingAward = await Award.findById(id);
        if (!existingAward) {
            return res.status(404).json({ message: 'Award not found' });
        }

        let updateData = {
            title: req.body.title,
            recipient: req.body.recipient,
            description: req.body.description,
            subtitle: req.body.subtitle
        };

        // Handle image update if new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            if (existingAward.image) {
                await deleteFromCloudinary(getPublicIdFromUrl(existingAward.image));
            }
            updateData.image = req.file.path;
        }

        const updatedAward = await Award.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updatedAward,
            message: 'Award updated successfully'
        });
    } catch (error) {
        // If there's an error and we uploaded a new file, clean it up
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }

        res.status(500).json({
            success: false,
            message: 'Error updating award',
            error: error.message
        });
    }
};

// Delete award
export const deleteAward = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)

        if (!id) {
            return res.status(400).json({ message: 'Invalid award ID' });
        }
        console.log(id)
     
        const award = await Award.findById(id);
 
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }

        // Delete image from Cloudinary first
     

        // Then delete the award document
        await award.deleteOne();

        res.json({
            success: true,
            message: 'Award deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting award',
            error: error.message
        });
    }
};

  
export const addSponsor = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'Image file is required' });
      }

      const newSponsor = new Sponsor({
          title: req.body.title,
          subtitle: req.body.subtitle,
          description: req.body.description,
          image: req.file.path
      });

      const savedSponsor = await newSponsor.save();
      
      res.status(201).json({
          success: true,
          data: savedSponsor,
          message: 'Sponsor added successfully'
      });
  } catch (error) {
      // Clean up uploaded image if there's an error
      if (req.file?.path) {
          await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
      }
      console.log(error);
      res.status(500).json({
          success: false,
          message: 'Error adding sponsor',
          error: error.message
      });
  }
};

export const updateSponsor = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: 'Invalid sponsor ID' });
      }

      const existingSponsor = await Sponsor.findById(id);
      if (!existingSponsor) {
          return res.status(404).json({ message: 'Sponsor not found' });
      }

      let updateData = {
          title: req.body.title,
          subtitle: req.body.subtitle,
          description: req.body.description
      };

      // Handle image update if new file is uploaded
      if (req.file) {
          // Delete old image from Cloudinary
          if (existingSponsor.image) {
              await deleteFromCloudinary(getPublicIdFromUrl(existingSponsor.image));
          }
          updateData.image = req.file.path;
      }

      const updatedSponsor = await Sponsor.findByIdAndUpdate(
          id,
          { $set: updateData },
          { new: true, runValidators: true }
      );

      res.json({
          success: true,
          data: updatedSponsor,
          message: 'Sponsor updated successfully'
      });
  } catch (error) {
      // Clean up uploaded image if there's an error
      if (req.file?.path) {
          await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
      }

      res.status(500).json({
          success: false,
          message: 'Error updating sponsor',
          error: error.message
      });
  }
};

export const deleteSponsor = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: 'Invalid sponsor ID' });
      }

      const sponsor = await Sponsor.findById(id);
      if (!sponsor) {
          return res.status(404).json({ message: 'Sponsor not found' });
      }

      // Delete image from Cloudinary first
      if (sponsor.image) {
          await deleteFromCloudinary(getPublicIdFromUrl(sponsor.image));
      }

      // Delete the sponsor document
      await sponsor.deleteOne();

      res.json({
          success: true,
          message: 'Sponsor deleted successfully'
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error deleting sponsor',
          error: error.message
      });
  }
};
  
  export const createMember = async (req, res) => {
    try {
        if (!req.file && !req.body.image) {
            return res.status(400).json({ message: 'Profile image is required (file upload or URL)' });
        }

        const newMember = new Member({
            title: req.body.title,
            position: req.body.position,
            linkedinUrl: req.body.description,
            image:  req.file.path  // Use uploaded file path or provided URL
        });

        const savedMember = await newMember.save();
        
        res.status(201).json({
            success: true,
            data: savedMember,
            message: 'Member added successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error adding member',
            error: error.message
        });
    }
};

export const updateMember = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid member ID' });
        }

        const existingMember = await Member.findById(id);
        if (!existingMember) {
            return res.status(404).json({ message: 'Member not found' });
        }

        let updateData = {
            title: req.body.title,
            position: req.body.position,
            linkedinUrl: req.body.description
        };

        // Handle image update
        if (req.file) {
            // If new file is uploaded, delete old image from Cloudinary (if it was uploaded there)
            if (existingMember.image && existingMember.image.includes('cloudinary')) {
                await deleteFromCloudinary(getPublicIdFromUrl(existingMember.image));
            }
            updateData.image = req.file.path;
        } else if (req.body.image && req.body.image !== existingMember.image) {
            // If new image URL is provided and it's different from the existing one
            if (existingMember.image && existingMember.image.includes('cloudinary')) {
                await deleteFromCloudinary(getPublicIdFromUrl(existingMember.image));
            }
            updateData.image = req.body.image;
        }

        const updatedMember = await Member.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updatedMember,
            message: 'Member updated successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }

        res.status(500).json({
            success: false,
            message: 'Error updating member',
            error: error.message
        });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid member ID' });
        }

        const member = await Member.findById(id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Delete image from Cloudinary if it was uploaded there
        if (member.image && member.image.includes('cloudinary')) {
            await deleteFromCloudinary(getPublicIdFromUrl(member.image));
        }

        await member.deleteOne();

        res.json({
            success: true,
            message: 'Member deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting member',
            error: error.message
        });
    }
};

export const createNewsletter = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }
  
      const newArticle = new Article({
        title: req.body.title,
        Type: req.body.type, // Explicitly set Type as Newsletter
        publishDate: new Date(req.body.publishDate),
        description: req.body.content,
        image: req.file.path,
      });
  
      const savedNewsletter = await newArticle.save();
      
      res.status(201).json({
        success: true,
        data: savedNewsletter,
        message: 'Newsletter created successfully'
      });
    } catch (error) {
      // Clean up uploaded image if there's an error
      if (req.file?.path) {
        await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
      }
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Error creating newsletter',
        error: error.message
      });
    }
  };
  
  export const updateNewsletter = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: 'Invalid newsletter ID' });
      }
  
      const existingNewsletter = await Article.findById(id);
      if (!existingNewsletter) {
        return res.status(404).json({ message: 'Newsletter not found' });
      }
  
      let updateData = {
        title: req.body.title,
        publishDate: new Date(req.body.publishDate),
        description: req.body.content,

      };
  
      // Handle image update if new file is uploaded
      if (req.file) {
        // Delete old image from Cloudinary
        if (existingNewsletter.image) {
          await deleteFromCloudinary(getPublicIdFromUrl(existingNewsletter.image));
        }
        updateData.image = req.file.path;
      }
  
      const updatedNewsletter = await Article.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      res.json({
        success: true,
        data: updatedNewsletter,
        message: 'Newsletter updated successfully'
      });
    } catch (error) {
      // Clean up uploaded image if there's an error
      if (req.file?.path) {
        await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
      }
  
      res.status(500).json({
        success: false,
        message: 'Error updating newsletter',
        error: error.message
      });
    }
  };
  
  export const deleteNewsletter = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: 'Invalid newsletter ID' });
      }
  
      const newsletter = await Article.findById(id);
      if (!newsletter) {
        return res.status(404).json({ message: 'Newsletter not found' });
      }
  
      // Delete image from Cloudinary first
      if (newsletter.image) {
        await deleteFromCloudinary(getPublicIdFromUrl(newsletter.image));
      }
  
      // Delete the newsletter document
      await newsletter.deleteOne();
  
      res.json({
        success: true,
        message: 'Newsletter deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting newsletter',
        error: error.message
      });
    }
  };
  
  export const addStartup = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newStartup = new Startup({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            image: req.file.path,
            status: req.body.status || 'Current' // Default to 'Current' if not provided
        });

        const savedStartup = await newStartup.save();
        
        res.status(201).json({
            success: true,
            data: savedStartup,
            message: 'Startup added successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error adding startup',
            error: error.message
        });
    }
};

export const updateStartup = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid startup ID' });
        }

        const existingStartup = await Startup.findById(id);
        if (!existingStartup) {
            return res.status(404).json({ message: 'Startup not found' });
        }

        let updateData = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            status: req.body.status
        };

        // Handle image update if new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            if (existingStartup.image) {
                await deleteFromCloudinary(getPublicIdFromUrl(existingStartup.image));
            }
            updateData.image = req.file.path;
        }

        const updatedStartup = await Startup.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updatedStartup,
            message: 'Startup updated successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }

        res.status(500).json({
            success: false,
            message: 'Error updating startup',
            error: error.message
        });
    }
};

export const deleteStartup = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid startup ID' });
        }

        const startup = await Startup.findById(id);
        if (!startup) {
            return res.status(404).json({ message: 'Startup not found' });
        }

        // Delete image from Cloudinary first
        if (startup.image) {
            await deleteFromCloudinary(getPublicIdFromUrl(startup.image));
        }

        // Delete the startup document
        await startup.deleteOne();

        res.json({
            success: true,
            message: 'Startup deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting startup',
            error: error.message
        });
    }
};
  
export const createGallery = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newGalleryItem = new Gallery({
            title: req.body.title,
            subtitle: req.body.subtitle || '',
            photo: req.file.path // Cloudinary URL from multer
        });

        const savedGalleryItem = await newGalleryItem.save();
        
        res.status(201).json({
            success: true,
            data: savedGalleryItem,
            message: 'Gallery item created successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating gallery item',
            error: error.message
        });
    }
};

export const updateGallery = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid gallery item ID' });
        }

        const existingGalleryItem = await Gallery.findById(id);
        if (!existingGalleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        let updateData = {
            title: req.body.title,
            subtitle: req.body.subtitle || existingGalleryItem.subtitle
        };

        // Handle image update if new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            if (existingGalleryItem.photo) {
                await deleteFromCloudinary(getPublicIdFromUrl(existingGalleryItem.photo));
            }
            updateData.photo = req.file.path;
        }

        const updatedGalleryItem = await Gallery.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updatedGalleryItem,
            message: 'Gallery item updated successfully'
        });
    } catch (error) {
        // Clean up uploaded image if there's an error
        if (req.file?.path) {
            await deleteFromCloudinary(getPublicIdFromUrl(req.file.path));
        }

        res.status(500).json({
            success: false,
            message: 'Error updating gallery item',
            error: error.message
        });
    }
};

export const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid gallery item ID' });
        }

        const galleryItem = await Gallery.findById(id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        // Delete image from Cloudinary first
        if (galleryItem.photo) {
            await deleteFromCloudinary(getPublicIdFromUrl(galleryItem.photo));
        }

        // Delete the gallery item document
        await galleryItem.deleteOne();

        res.json({
            success: true,
            message: 'Gallery item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting gallery item',
            error: error.message
        });
    }
};
  
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Invalid contact ID' });
        }

        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Delete the contact document
        await contact.deleteOne();

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error.message
        });
    }
};
  