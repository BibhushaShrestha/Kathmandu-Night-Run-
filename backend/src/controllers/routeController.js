import Route from "../models/Route.js";

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
