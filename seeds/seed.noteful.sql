INSERT INTO noteful_folders (folder_name)
VALUES('Lists'),
        ('To Dos'),
        ('Important');


INSERT INTO noteful_notes(note_name, modified, folderId, content)
VALUES ('Dr. Appointment', now(), 3, 'Friday at 10am'),
        ('Vet Appointment', now(), 3, 'Friday at 12pm'),
        ('Mow Lawn', now(), 2, 'Mow the lawn'),
        ('Important Note', now(), 3, 'This is a note all about important things'),
        ('Grocery List', now(), 1, 'What I need to buy at the grocery store'),
        ('To Do', now(), 2, 'Clean the house, Do the Dishes, Do Laundry, Walk Dogs'),
        ('School Work', now(), 2, 'Study for test, submit assignment by Friday at 4pm'),
        ('Birthday Shopping List', now(), 1, 'Birthday present list: balloons, paper plates, confetti'),
        ('Car', now(), 2, 'Renew registration, get inspection done');
        
        