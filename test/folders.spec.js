const app = require('../src/app')
const {expect} = require('chai')
const knex = require('knex')


const testNotes = [
  {id: 1,
    note_name: 'super important',
    modified: new Date,
    folderid: 1,
    content: 'lorem ipsum lorem ipsum lorem ipsum'
  },
  {id: 2,
    note_name: 'not very important',
    modified: new Date,
    folderid: 2,
    content: 'lorem ipsum lorem ipsum lorem ipsum'
  },
  {id: 3,
    note_name: 'important',
    modified: new Date,
    folderid: 3,
    content: 'lorem ipsum lorem ipsum lorem ipsum'
  }
]



describe('Folders endpoints', () => {
  //make connection
        let db
        before('make knex instance',() => {
          db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
          })
          app.set('db', db)
        })
      // destroy connection after request
        after('disconnect from db',()=> db.destroy())
      // clean tables before and after
        before('clean the table', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'))
        afterEach('cleanup',() => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'))

  context('GET requests given there is not data', ()=>{
    it('GET / responds with 200 and [] given no folders', () => {
      return supertest(app)
        .get('/api/folders')
        .expect(200,[])
    })
    it('GET /api/folders/:id given the folder does not exist, return 404 not found',()=>{
      const folderId = 12345
      return supertest(app)
      .get(`/api/folders/${folderId}`)
      .expect(400)
      .then(res=>{
        expect(res.body.error.message).to.equal('Folder not found')
      })
    })
  })

  context('GET requests given there is data',()=>{
    const testFolders = [
      {
        id: 1,
        folder_name: 'super'
      },
      {
        id: 2,
        folder_name: 'spangley'
      },
      {
        id: 3,
        folder_name: 'important'
      }
    ];
    beforeEach('insert test folders', () => {
      return db.into('noteful_folders').insert(testFolders)
     })
     it('GET / responds with 200 and expected folder given an array of folders',()=>{
       return supertest(app)
       .get('/api/folders')
       .expect(200, testFolders)
     })
     it('GET api/folder/:id returns specified folder',()=>{
       const folderId = 2;
       const expectedFolder = testFolders[1]
       return supertest(app)
       .get(`/api/folders/${folderId}`)
       .expect(200, expectedFolder)
     }) 
  })
  context('POST requests',()=>{
    it('POST /api/folders/ adds new folder as expected',()=>{
      const newFolder = {
        folder_name: 'Reminders'
      }
      supertest(app)
      .post('/api/folders/')
      .send(newFolder)
      .expect(201)
      .then(res=> {
        expect(res.body.folder_name).to.equal('Reminders')
        expect(res.body.id).to.equal(1)
      })
    })
    it('POST will return 400 response if values are missing', ()=>{
      const faultyFolder = {
        folder_name: null
      }
      return supertest(app)
      .post('/api/folders/')
      .send(faultyFolder)
      .expect(400)
    })
  })
})