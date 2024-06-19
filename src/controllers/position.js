const { Position, Department } = require("../../models");

exports.createPosition = async (req, res) => {
  try {
    const position = await Position.create(req.body);
    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPositions = async (req, res) => {
  try {
    const positions = await Position.findAll({
      include: {
        model: Department,
        attributes: ["department_name"],
      },
    });

    const formattedPositions = positions.map((position) => ({
      id: position.id,
      id_department: position.id_department,
      position_name: position.position_name,
      department_name: position.Department
        ? position.Department.department_name
        : "Tidak ada departemen",
    }));

    res.status(200).json(formattedPositions);
    // res.status(200).json(positions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPositionById = async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id, {
      include: {
        model: Department,
        attributes: ["department_name"],
      },
    });
    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }
    res.status(200).json(position);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPositionByDepartment = async (req, res) => {
  const { departmentId } = req.params;
  try {
    const positions = await Position.findAll({
      where: { id_department: departmentId },
      include: {
        model: Department,
        attributes: ["department_name"],
      },
    });
    res.status(200).json(positions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const [updated] = await Position.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Position not found" });
    }
    const updatedPosition = await Position.findByPk(req.params.id);
    res.status(200).json(updatedPosition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const deleted = await Position.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Position not found" });
    }
    res.json({ message: `Position ${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
