import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Analyzes a single image for infrastructure issues
 * @param {string} base64Image - Base64 encoded image
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise} - API response
 */
export const analyzeImage = async (base64Image, lat, lng) => {
  try {
    const response = await api.post('/detect/analyze', {
      image: base64Image,
      lat,
      lng
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Analyzes multiple images in batch
 * @param {Array} images - Array of { image, lat, lng }
 * @returns {Promise} - API response
 */
export const analyzeBatch = async (images) => {
  try {
    const response = await api.post('/detect/batch', { images });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Retrieves all issues with optional filters
 * @param {Object} filters - Optional filters
 * @returns {Promise} - API response
 */
export const getIssues = async (filters = {}) => {
  try {
    const response = await api.get('/issues', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Updates an issue's status
 * @param {string} issueId - Issue ID
 * @param {string} status - New status
 * @returns {Promise} - API response
 */
export const updateIssueStatus = async (issueId, status) => {
  try {
    const response = await api.patch(`/issues/${issueId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Retrieves road health statistics
 * @returns {Promise} - API response
 */
export const getRoadHealthStats = async () => {
  try {
    const response = await api.get('/issues/stats/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;
