import TimetableEntry from "../models/timetable/timetable.model.js";

// Get all timetable entries for the logged-in user
export const getTimetableEntries = async (req, res) => {
  try {
    const userID = req.user._id;

    if (!userID) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const timetableEntries = await TimetableEntry.find({ user: userID });
    res.status(200).json({
      length: timetableEntries.length,
      timetableEntries,
    });
  } catch (error) {
    console.log("Error fetching timetable entries: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new timetable entry
export const createTimetableEntry = async (req, res) => {
  try {
    const { day, startTime, endTime, title, color } = req.body;

    // Validate input
    if (!day || !startTime || !endTime || !title || !color) {
      return res.status(400).json({
        message: "Day, start time, end time, title, and color are required",
      });
    }

    // Create a new entry in the database
    const timetableEntry = await TimetableEntry.create({
      day,
      startTime,
      endTime,
      title,
      color,
      user: req.user._id, // Associate the entry with the logged-in user
    });

    res.status(201).json(timetableEntry);
  } catch (error) {
    console.log("Error creating timetable entry: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a specific timetable entry by ID
export const updateTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, startTime, endTime, title, color } = req.body;

    // Validate input
    if (!day || !startTime || !endTime || !title || !color) {
      return res.status(400).json({
        message: "Day, start time, end time, title, and color are required",
      });
    }

    // Find the entry and ensure it belongs to the logged-in user
    const entry = await TimetableEntry.findOne({ _id: id, user: req.user._id });

    if (!entry) {
      return res.status(404).json({
        message: "Timetable entry not found or unauthorized",
      });
    }

    // Update the entry
    const updatedEntry = await TimetableEntry.findByIdAndUpdate(
      id,
      { day, startTime, endTime, title, color },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.log("Error updating timetable entry: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific timetable entry by ID
export const deleteTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the entry and ensure it belongs to the logged-in user
    const entry = await TimetableEntry.findOne({ _id: id, user: req.user._id });

    if (!entry) {
      return res.status(404).json({
        message: "Timetable entry not found or unauthorized",
      });
    }

    // Delete the entry
    await TimetableEntry.findByIdAndDelete(id);

    res.status(200).json({
      message: "Timetable entry deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting timetable entry: ", error);
    res.status(500).json({ message: error.message });
  }
};

// delete all timetable entries for the logged-in user
export const deleteAllTimetableEntries = async (req, res) => {
  try {
    const userID = req.user._id;

    const timetableEntries = await TimetableEntry.find({ user: userID });

    if (!timetableEntries || timetableEntries.length === 0) {
      return res.json({
        error: "No timetable entries found",
      });
    }

    // delete all timetable entries for the user
    await TimetableEntry.deleteMany({ user: userID });

    res.status(200).json({
      message: "All timetable entries have been deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting all timetable entries: ", error);
    res.status(500).json({ message: error.message });
  }
};
