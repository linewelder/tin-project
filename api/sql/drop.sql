-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-18 19:59:49.454

-- foreign keys
ALTER TABLE Tournament
    DROP FOREIGN KEY Tournament_User;

ALTER TABLE TournamentParticipant
    DROP FOREIGN KEY Wynik_Uczestnik;

ALTER TABLE TournamentParticipant
    DROP FOREIGN KEY Wynik_Zawody;

ALTER TABLE Tournament
    DROP FOREIGN KEY Zawody_Kategoria;

-- tables
DROP TABLE Category;

DROP TABLE Participant;

DROP TABLE Tournament;

DROP TABLE TournamentParticipant;

DROP TABLE User;

-- End of file.

