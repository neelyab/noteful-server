INSERT INTO noteful_folders (folder_name)
VALUES('Super'),
        ('Spangley'),
        ('Important');


INSERT INTO noteful_notes(note_name, modified, folderId, content)
VALUES ('Cat', now(), 2, 'This is a note all about cats'),
        ('Dog', now(), 1, 'This is a note all about dogs'),
        ('Hello', now(), 2, 'This is a note'),
        ('Important Note', now(), 3, 'This is a note all about important things'),
        ('Grocery List', now(), 3, 'What I need to buy at the grocery store'),
        ('To Do', now(), 1, 'Clean the house, Do the Dishes, Do Laundry, Walk Dogs'),
        ('School Work', now(), 1, 'Schedule for studying:'),
        ('Birthday', now(), 2, 'Birthday present list');
        
        