const User = require("../models/userModel");

exports.updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const updatedStaff = await User.findByIdAndUpdate(staffId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'No staff found with that ID' });
    }
    res.status(200).json({
      status: 'success',
      data: { user: updatedStaff }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};