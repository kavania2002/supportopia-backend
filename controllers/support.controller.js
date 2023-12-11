const SupportService = require('../services/support.services');

// console.log(SupportService);
const SupportController = {
    addSuppoter: async (req, res) => {
        try {
            const result = await SupportService.addSuppoter(req.body);
            return res.json(result);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

}

module.exports = SupportController;