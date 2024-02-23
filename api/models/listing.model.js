import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    others: {
        type: Boolean,
        required: true,
      },
   
    web_development: {
      type: Boolean,
      required: true,
    },
    cyber_security: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    AR_VR: {
      type: Boolean,
      required: true,
    },
    machine_learning: {
        type: Boolean,
        required: true,
      },
      Low_level: {
        type: Boolean,
        required: true,
      },
    imageUrls: {
      type: Array,
      required: true,
    },
    pdfUrls: {
        type: Array,
        required: true,
      },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;