// lib/api.js
const API_BASE_URL = 'http://localhost:8080';

/**
 * Fetch all entitlements with pagination
 */
export async function getEntitlements(limit = 20, offset = 0) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/entitlements?limit=${limit}&offset=${offset}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching entitlements:', error);
    throw error;
  }
}

/**
 * Fetch a single entitlement by ID
 */
export async function getEntitlementById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/entitlements/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching entitlement ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new entitlement
 */
export async function createEntitlement(entitlementData) {
  try {
    const response = await fetch(`${API_BASE_URL}/entitlements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entitlementData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating entitlement:', error);
    throw error;
  }
}

/**
 * Update an existing entitlement
 */
export async function updateEntitlement(id, updateData, updateMask) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/entitlements/${id}?updateMask=${updateMask}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating entitlement ${id}:`, error);
    throw error;
  }
}

/**
 * Search entitlements
 */
export async function searchEntitlements(filterString) {
  try {
    const response = await fetch(`${API_BASE_URL}/entitlements:search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: filterString,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching entitlements:', error);
    throw error;
  }
}