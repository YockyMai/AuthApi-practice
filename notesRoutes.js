const Router = require('express');
const notesController = require('./notesController'); //функции, импортируем для декомпозиции

const router = new Router();

router.post('/createnote', notesController.createNote);
router.post('/updatenote', notesController.updateNote);
router.post('/deletenote', notesController.deleteNote);
router.post('/getnotes', notesController.getNotes);

module.exports = router;
