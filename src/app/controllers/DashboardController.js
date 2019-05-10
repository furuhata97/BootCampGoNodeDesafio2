const { User } = require('../models')
const { Op } = require('sequelize')
const { Appointment } = require('../models')
const moment = require('moment')

class DashBoardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    const users = await User.findAll({ where: { provider: false } })

    const date = moment()

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'usuario' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    console.log('Compromissos' + appointments)

    return res.render('dashboard', { providers, users, appointments })
  }
}

module.exports = new DashBoardController()
