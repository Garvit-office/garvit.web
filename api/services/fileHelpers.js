// File helpers for loading and saving JSON files
import fs from 'fs';

export const loadFile = (file) => {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) { console.error("Error loading:", e); }
  return [];
};

export const saveFile = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) { console.error("Error saving:", e); }
};
