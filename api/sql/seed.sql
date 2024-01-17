INSERT INTO Participant(IdParticipant, FirstName, LastName)
VALUES (1, 'John', 'Doe');
INSERT INTO Participant(IdParticipant, FirstName, LastName)
VALUES (2, 'Jane', 'Smith');
INSERT INTO Participant(IdParticipant, FirstName, LastName)
VALUES (3, 'Jakub', 'Nowacki');

INSERT INTO Category(IdCategory, Name, Description)
VALUES (1, '3x3x3', 'Klasyczna najzwyczajniejsza kosta Rubika.');
INSERT INTO Category(IdCategory, Name, Description)
VALUES (2, '4x4x4', 'Nadal nie zbyt dziwna kostka, tylko trochę większa.');
INSERT INTO Category(IdCategory, Name, Description)
VALUES (3, 'Square-1', 'o_0 co to?');

INSERT INTO User(IdUser, FirstName, LastName, Admin)
VALUES (1, 'Jan', 'Nowak', 0);
INSERT INTO User(IdUser, FirstName, LastName, Admin)
VALUES (2, 'Marta', 'Nowacka', 1);


INSERT INTO Tournament(IdTournament, Name, Date, IdCategory, Closed, Organizer, Address)
VALUES (1, 'Pierszy Turniej', '2024-01-01', 1, 1, 1, 'Gdańsk');
INSERT INTO Tournament(IdTournament, Name, Date, IdCategory, Closed, Organizer, Address)
VALUES (2, 'Drugi Turniej', '2024-01-20', 2, 0, 2, 'Warszawa');

INSERT INTO TournamentParticipant(IdParticipant, IdTournament, Time)
VALUES (1, 1, 15.576);
INSERT INTO TournamentParticipant(IdParticipant, IdTournament, Time)
VALUES (2, 1, 11.247);
INSERT INTO TournamentParticipant(IdParticipant, IdTournament, Time)
VALUES (2, 2, 104.165);
INSERT INTO TournamentParticipant(IdParticipant, IdTournament, Time)
VALUES (3, 2, 95.949);
