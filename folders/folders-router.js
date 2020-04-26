const express = require('express')
const FoldersService = require('./FoldersService')
const foldersRouter = express.Router()
const jsonParser = express.json()

foldersRouter
.route('/')
.get((req, res, next) =>{
    FoldersService.getFolders(req.app.get('db'))
    .then(folders =>{
        res.status(200)
        .json(folders)
    })
    .catch(next)
})
.post(jsonParser, (req, res, next)=>{
    const {folder_name} = req.body
    const newFolder = { folder_name }
    
    const folder_value = Object.values(newFolder).filter(Boolean).length
    if (folder_value === 0){
        return res.status(400).json({error: {message: 'please provide a folder name'}})
    }
    FoldersService.addFolder(req.app.get('db'), newFolder)
    .then(folder=>{
        res.status(201)
        .location(`/api/folders/${folder.id}`)
        .json(folder)
    })
    .catch(next)
})

foldersRouter
.route('/:id')
.get((req, res, next) => {
    FoldersService.getFolderById(req.app.get('db'), req.params.id)
    .then(folder =>{
        if (!folder){
            return res.status(400).json({error: {message: 'Folder not found'}})
        }
        res.status(200)
        .json(folder)
    })
})

module.exports = foldersRouter