import { useState, useEffect } from "react";
import axios from "axios";

const WEB_API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const getAllImages = async () => {
  try {
    const response = await axios.get(`${AUTH_API_URL}/cloudinary/get-all`);
    console.log(response.data.data);
    return { images: response.data.data, error: null };
  } catch (error) {
    console.log(error.response.data);
    return { images: [], error: error.response.data.error};
  }
};

export const deleteImage = async (asset_id) => {
  try {
    const response = await axios.delete(`${AUTH_API_URL}/cloudinary/${asset_id}`);
    return { images: response.data.data, error: null };
  } catch (error) {
    console.log(error.response.data);
    return { images: [], error: error.response.data.error};
  }
};
