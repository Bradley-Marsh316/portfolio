const Users = require('../../persistence/users');
const Email = require('../../email');

const groups = [
  'Pending',
  'User',
  'All'
]

module.exports = {
  async hasUserAccess(req, res) {
    return res.status(200).json({message: 'Access Approved'});
  },
  async hasAdminAccess(req, res) {
    return res.status(200).json({message: 'Access Approved'});
  },
  async getUsersByGroup(req, res) {
    try {
      if (!groups.includes(req.params.group)) return res.status(400).json({message: 'Invalid group'});
      const group = req.params.group.toLowerCase();
      const users = await Users.getByGroup(group);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({error});
    }
  },
  async getNumByGroup(req, res) {
    try {
      if (!groups.includes(req.params.group)) return res.status(400).json({message: 'Invalid group'});
      const group = req.params.group.toLowerCase();
      const users = await Users.getByGroup(group);
      return res.status(200).json({number: users.length});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error});
    }
  },
  async updateAccessLevel(req, res) {
    try {
      const { id, accessLevel } = req.body;
      if (!id || !accessLevel) return res.status(400).json({message: "Id and access level must be provided."})

      const user = await Users.updateAccessLevel(id, accessLevel);
      const { email } = await Users.getEmailById(id);

      if (accessLevel === "user") {
        const message = {
          url: process.env.FE_BASE_URL
        }
    
        Email.send(email, 'access-granted', message, 'Sondar Properties - Access Approved').catch( error => {
          console.log(`Error access granted email for ${email}`);
          console.log(error);
        })
      } else if (accessLevel === "denied") {
    
        Email.send(email, 'access-denied', {}, 'Sondar Properties - Access Approved').catch( error => {
          console.log(`Error access denied email for ${email}`);
          console.log(error);
        })
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
}