const { Employee, Position } = require("../../models");

exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Position,
        attributes: ["position_name"],
      },
      order: ["id"],  
    });

    const formattedPositions = employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      id_position: employee.id_position,
      position_name: employee.Position.position_name,
      age: employee.age,
      gender: employee.gender,
      birth_date: employee.birth_date,
      address: employee.address,
    }));

    res.status(200).json(formattedPositions);
    // res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: {
        model: Position,
        attributes: ["id_department", "position_name"],
      },
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const updatedEmployee = await Employee.findByPk(req.params.id);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: `Employee ${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
