const express = require('express')
const NotesService = require('./NotesService')
const xss = require('xss')
const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
    id: note.id,
    note_name: xss(note.note_name),
    modified: note.modified,
    folderId: note.folderId,
    content: xss(note.content)
})

notesRouter
.route('/')
.get((req, res, next)=>{
    NotesService.getNotes(req.app.get('db'))
    .then(notes=>{
        res.status(200)
        .json(notes.map(serializeNote))
    })
})
.post(jsonParser, (req, res, next) =>{
    const {note_name, folderId, content} = req.body
    const note = {
        note_name,
        folderId,
        content
    }
    // const fields = ['note_name', 'folderId', 'content']
    // fields.map(field=>{
    //     if (!note[field]){
    //         return res.status(400).json({error: {message:`please enter valid ${field}`}})
    //     }
    // })
    for (const [key, value] of Object.entries(note)) {
        if (value == null) {
           return res.status(400).json({
             error: { message: `Missing '${key}' in request body` }
           })
         }
       }
    NotesService.addNote(req.app.get('db'), note)
    .then(note=>{
       return res.status(201)
       .location(`/api/notes/${note.id}`)
       .json(serializeNote(note))
    })
    .catch(next)
})


notesRouter
.route('/:id')
.all((req, res, next) =>{
    NotesService.getById(req.app.get('db'), req.params.id)
    .then(note=>{
        if(!note){
            return res.status(404).json({error:{message:'Note not found'}})
        }
        res.note = note
        next()
    })
})
.get((req, res)=>{
   return res.status(200).json(serializeNote(res.note))
})
.patch(jsonParser, (req, res, next) => {
    const { folderId, content, note_name } = req.body
    updatedNote = {
        folderId,
        content,
        note_name
    }
    const note = Object.keys(updatedNote).filter(Boolean).length
    if(note === 0){
        return res.status(400).json({error:{message: 'please enter updated information'}})
    }
    NotesService.updateNote(req.app.get('db'), req.params.id, updatedNote)
    .then(note=>{
        res.status(204).json(serializeNote(note))
    })
    .catch(next)
})
module.exports = notesRouter