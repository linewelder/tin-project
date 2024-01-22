-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-22 19:56:22.812

-- tables
-- Table: Category
CREATE TABLE Category (
    IdCategory int  NOT NULL AUTO_INCREMENT,
    Name varchar(20)  NOT NULL,
    Description varchar(200)  NOT NULL,
    CONSTRAINT Category_pk PRIMARY KEY (IdCategory)
);

-- Table: Participant
CREATE TABLE Participant (
    IdParticipant int  NOT NULL AUTO_INCREMENT,
    FirstName varchar(30)  NOT NULL,
    LastName varchar(30)  NOT NULL,
    CONSTRAINT Participant_pk PRIMARY KEY (IdParticipant)
);

-- Table: Tournament
CREATE TABLE Tournament (
    IdTournament int  NOT NULL AUTO_INCREMENT,
    Name varchar(50)  NOT NULL,
    Date date  NOT NULL,
    IdCategory int  NOT NULL,
    IsClosed tinyint(1)  NOT NULL,
    Organizer int  NOT NULL,
    Address varchar(150)  NOT NULL,
    CONSTRAINT Tournament_pk PRIMARY KEY (IdTournament)
);

-- Table: TournamentParticipant
CREATE TABLE TournamentParticipant (
    IdParticipant int  NOT NULL,
    IdTournament int  NOT NULL,
    Time numeric(6,3)  NULL,
    CONSTRAINT TournamentParticipant_pk PRIMARY KEY (IdParticipant,IdTournament)
);

-- Table: User
CREATE TABLE User (
    IdUser int  NOT NULL AUTO_INCREMENT,
    Email varchar(75)  NOT NULL,
    Password char(60)  NOT NULL,
    FirstName varchar(30)  NOT NULL,
    LastName varchar(30)  NOT NULL,
    IsAdmin tinyint(1)  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (IdUser)
);

-- foreign keys
-- Reference: Tournament_User (table: Tournament)
ALTER TABLE Tournament ADD CONSTRAINT Tournament_User FOREIGN KEY Tournament_User (Organizer)
    REFERENCES User (IdUser)
    ON DELETE CASCADE;

-- Reference: Wynik_Uczestnik (table: TournamentParticipant)
ALTER TABLE TournamentParticipant ADD CONSTRAINT Wynik_Uczestnik FOREIGN KEY Wynik_Uczestnik (IdParticipant)
    REFERENCES Participant (IdParticipant)
    ON DELETE CASCADE;

-- Reference: Wynik_Zawody (table: TournamentParticipant)
ALTER TABLE TournamentParticipant ADD CONSTRAINT Wynik_Zawody FOREIGN KEY Wynik_Zawody (IdTournament)
    REFERENCES Tournament (IdTournament)
    ON DELETE CASCADE;

-- Reference: Zawody_Kategoria (table: Tournament)
ALTER TABLE Tournament ADD CONSTRAINT Zawody_Kategoria FOREIGN KEY Zawody_Kategoria (IdCategory)
    REFERENCES Category (IdCategory)
    ON DELETE CASCADE;

-- End of file.

