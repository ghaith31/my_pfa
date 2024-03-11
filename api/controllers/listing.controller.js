import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/eroor.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};


  
  
  export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return next(errorHandler(404, 'documents not found!'));
    }
  
    if (req.user.id === listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own documents!'));
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('document has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'document not found!'));
    }
   // if (req.user.id !== listing.userRef) {
      //return next(errorHandler(401, 'You can only update your own document!'));
   // }
  
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };

  export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };
  
  export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      
     let web_development = req.query.web_development;
  
      if (web_development === undefined || web_development === 'false') {
        web_development = { $in: [false, true] };
      }
  
      let first_year = req.query.first_year;
  
      if (first_year === undefined || first_year === 'false') {
        first_year = { $in: [false, true] };
      }

      let second_year = req.query.second_year;
  
      if (second_year === undefined || second_year === 'false') {
        second_year = { $in: [false, true] };
      }
    
      let  cyber_security = req.query. cyber_security;
  
      if ( cyber_security === undefined ||  cyber_security === 'false') {
        cyber_security = { $in: [false, true] };
      }

      let others = req.query.others;
  
      if (others === undefined || others === 'false') {
        others = { $in: [false, true] };
      }

      let machine_learning = req.query.machine_learning;
  
      if (machine_learning === undefined || machine_learning === 'false') {
        machine_learning = { $in: [false, true] };
      }


      let Low_level = req.query.Low_level;
  
      if (Low_level === undefined || Low_level === 'false') {
        Low_level = { $in: [false, true] };
      }

      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      //const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        AR_VR,
        type,
        Low_level,
        machine_learning,
        others,
        cyber_security,
        second_year,
        first_year,
        web_development,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };

 