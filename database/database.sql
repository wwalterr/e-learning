-- Schema graph
DROP SCHEMA IF EXISTS `graph` ;

-- Schema graph
CREATE SCHEMA IF NOT EXISTS `graph` DEFAULT CHARACTER SET utf8 ;

USE `graph` ;

-- Table `graph`.`user`
DROP TABLE IF EXISTS `graph`.`user` ;

CREATE TABLE IF NOT EXISTS `graph`.`user` (
  `id` INT(11) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(11) NULL,
  `firstName` VARCHAR(255) NULL,
  `secondName` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `matriculation` VARCHAR(8) NOT NULL,
  `creator` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `matriculation_UNIQUE` (`matriculation` ASC) VISIBLE)

-- Table `graph`.`class`
DROP TABLE IF EXISTS `graph`.`class` ;

CREATE TABLE IF NOT EXISTS `graph`.`class` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vacancies` INT(11) NOT NULL,
  `instructor` INT(11) NOT NULL,
  `room` VARCHAR(255) NOT NULL,
  `shift` VARCHAR(255) NOT NULL,
  `courseId` INT(11) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `time` TIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_course1_idx` (`courseId` ASC) VISIBLE,
  CONSTRAINT `fk_class_course1`
    FOREIGN KEY (`courseId`)
    REFERENCES `graph`.`course` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)

-- Table `graph`.`contact`
DROP TABLE IF EXISTS `graph`.`contact` ;

CREATE TABLE IF NOT EXISTS `graph`.`contact` (
  `id` INT(11) NOT NULL,
  `email` VARCHAR(255) NULL,
  `phone` CHAR(15) NULL,
  `userId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idContact_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_contact_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_contact_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `graph`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

-- Table `graph`.`address`
DROP TABLE IF EXISTS `graph`.`address` ;

CREATE TABLE IF NOT EXISTS `graph`.`address` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NULL,
  `number` INT(11) NULL,
  `complement` VARCHAR(255) NULL,
  `city` VARCHAR(255) NULL,
  `state` VARCHAR(255) NULL,
  `zipCode` VARCHAR(15) NULL,
  `userId` INT(11) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_address_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_address_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `graph`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

-- Table `graph`.`course`
DROP TABLE IF EXISTS `graph`.`course` ;

CREATE TABLE IF NOT EXISTS `graph`.`course` (
  `id` INT(11) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `creator` INT(11) NOT NULL,
  `private` TINYINT(1) NULL,
  PRIMARY KEY (`id`))

-- Table `graph`.`userCourse`
DROP TABLE IF EXISTS `graph`.`userCourse` ;

CREATE TABLE IF NOT EXISTS `graph`.`userCourse` (
  `userId` INT(11) NOT NULL,
  `courseId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`userId`, `courseId`),
  INDEX `fk_user_has_course_course1_idx` (`courseId` ASC) VISIBLE,
  INDEX `fk_user_has_course_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_course_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `graph`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_course_course1`
    FOREIGN KEY (`courseId`)
    REFERENCES `graph`.`course` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)

-- Table `graph`.`class`
DROP TABLE IF EXISTS `graph`.`class` ;

CREATE TABLE IF NOT EXISTS `graph`.`class` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vacancies` INT(11) NOT NULL,
  `instructor` INT(11) NOT NULL,
  `room` VARCHAR(255) NOT NULL,
  `shift` VARCHAR(255) NOT NULL,
  `courseId` INT(11) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `time` TIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_course1_idx` (`courseId` ASC) VISIBLE,
  CONSTRAINT `fk_class_course1`
    FOREIGN KEY (`courseId`)
    REFERENCES `graph`.`course` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)

-- Table `graph`.`progress`
DROP TABLE IF EXISTS `graph`.`progress` ;

CREATE TABLE IF NOT EXISTS `graph`.`progress` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `attendance` INT(11) NOT NULL,
  `grade` FLOAT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))

-- Table `graph`.`classUser`
DROP TABLE IF EXISTS `graph`.`classUser` ;

CREATE TABLE IF NOT EXISTS `graph`.`classUser` (
  `classId` INT NOT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `id` INT(11) NOT NULL,
  `progressId` INT(11) NOT NULL,
  PRIMARY KEY (`classId`, `userId`, `id`),
  INDEX `fk_class_has_user_user1_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_class_has_user_class1_idx` (`classId` ASC) VISIBLE,
  UNIQUE INDEX `progress_idProgress_UNIQUE` () VISIBLE,
  INDEX `fk_classUser_progress1_idx` (`progressId` ASC) VISIBLE,
  CONSTRAINT `fk_class_has_user_class1`
    FOREIGN KEY (`classId`)
    REFERENCES `graph`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_has_user_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `graph`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_classUser_progress1`
    FOREIGN KEY (`progressId`)
    REFERENCES `graph`.`progress` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

-- Table `graph`.`scope`
DROP TABLE IF EXISTS `graph`.`scope` ;

CREATE TABLE IF NOT EXISTS `graph`.`scope` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)

-- Table `graph`.`userScope`
DROP TABLE IF EXISTS `graph`.`userScope` ;

CREATE TABLE IF NOT EXISTS `graph`.`userScope` (
  `scopeId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`scopeId`, `userId`),
  INDEX `fk_scope_has_user_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_scope_has_user_scope1`
    FOREIGN KEY (`scopeId`)
    REFERENCES `graph`.`scope` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scope_has_user_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `graph`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
