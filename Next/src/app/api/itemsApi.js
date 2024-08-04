// itemsApi.js

import { supabase } from '../../lib/supabase'; 

// Fetch all items
export const getItems = async () => {
  try {
    const { data, error } = await supabase.from('items').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Rethrow or handle as appropriate
  }
};

// Fetch item by ID
export const getItemById = async (id) => {
  try {
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error; // Rethrow or handle as appropriate
  }
};

// Add an item
export const addItem = async (item) => {
  try {
    const { data, error } = await supabase.from('items').insert(item);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error; // Rethrow or handle as appropriate
  }
};

// Update an item
export const updateItem = async (id, updates) => {
  try {
    const { data, error } = await supabase.from('items').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error; // Rethrow or handle as appropriate
  }
};

// Delete an item
export const deleteItem = async (id) => {
  try {
    const { data, error } = await supabase.from('items').delete().eq('id', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error; // Rethrow or handle as appropriate
  }
};
