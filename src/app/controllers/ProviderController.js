const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment } = require('../Appointment')

class ProviderController {
  async list (req, res) {
    const date = moment()

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.params.user,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    return res.render('available/index', { appointments })
  }
}

module.exports = new ProviderController()
