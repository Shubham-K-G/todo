const mongoose = require("mongoose")

const schema = mongoose.Schema({
	task: {type:String, required: true},
	date: {type: Date, required: true },
	status: {type: String}
})

module.exports = mongoose.model("Tasks", schema)