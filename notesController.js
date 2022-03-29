//ТУТ ОПИСЫВАЕМ ФУНКЦИИ ДЛЯ РЕГСИТАРИЦИ АВТОРИЗАЦИИ И ТД
const Notes = require('./models/Notes');
const User = require('./models/Users');

class notesController {
	async createNote(req, res) {
		try {
			const { username, note } = req.body;

			const author = await User.findOne({ username: username });
			if (!author) {
				return res.status(400).json({
					message: 'что то пошло не так',
				});
			}

			if (note.id) {
				const result = await Notes.updateOne(
					{ _id: note.id, author: username },
					{
						$set: {
							title: note.title,
							color: note.color,
							noteText: note.noteText,
						},
					},
				);
				return res.json({
					result,
				});
			}

			const userNote = new Notes({
				author: username,
				title: note.title,
				noteText: note.noteText,
				color: note.color,
			});
			await userNote.save();
			return res.json({
				message: 'Сохраненно!',
			});
		} catch (e) {
			console.log(e);
		}
	}
	async updateNote(req, res) {
		try {
			const { username, id, note } = req.body;

			const author = await User.findOne({ username: username });
			if (!author) {
				return res.status(400).json({
					message: 'что то пошло не так',
				});
			}

			return res.json({
				message: result,
			});
		} catch (e) {
			console.log(e);
		}
	}
	async deleteNote(req, res) {
		try {
			const { username, id } = req.body;

			const author = await User.findOne({ username: username });
			if (!author) {
				return res.status(400).json({
					message: 'что то пошло не так',
				});
			}
			const result = await Notes.deleteOne({ _id: id, author: username });

			return res.json({
				message: result.deletedCount,
			});
		} catch (e) {
			console.log(e);
		}
	}
	async getNotes(req, res) {
		try {
			const { username } = req.body;

			const author = await User.findOne({ username: username }); // вытаскиваем роль из ROlE
			if (!author) {
				return res.status(400).json({
					message: 'что то пошло не так',
				});
			}
			const userNotes = await Notes.find({ author: username });

			return res.json({
				userNotes,
			});
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new notesController();
