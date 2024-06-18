const { Department } = require("../../models");

exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get data departments" });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const [updated] = await Department.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ error: "Department not found" });
    }
    const updatedDepartment = await Department.findByPk(req.params.id);
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json({message: `Department ${req.params.id} deleted`});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
