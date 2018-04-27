'use strict';
/*
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.jsoup.helper.StringUtil;

import com.suko.DAO.business.Word;
import com.suko.DAO.dataBase.WordGraphDB;
*/

// Core dependency
const talkify = require('talkify');
const Bot = talkify.Bot;
var _ = require('lodash');

// Types dependencies
const BotTypes = talkify.BotTypes;
const Message = BotTypes.Message;
const SingleLineMessage = BotTypes.SingleLineMessage;
const MultiLineMessage = BotTypes.MultiLineMessage;

// Skills dependencies
const Skill = BotTypes.Skill;
//var mongo = require('../../../../mongo');
//var TasksDAO = require('./TasksDao').TasksDAO;
//var ObjectID = require('mongodb').ObjectID;

/**
 * Analyse input text
 * @param {object} text - the text to analyse
 */
function analyse(text){
	return (function(tasksDAO) {
	//	var taskWithObjectId = _.clone(task,true);
      //  taskWithObjectId._id = new ObjectID(task._id);
		//return tasksDAO.save(taskWithObjectId);
	});
}

/**
 * return the word forms must be excluded by the analyser
 * @param {object} language - the source language of the text to be analyzed
 */
function getWordFormToExclude(language){
      var listWordForm = ' ';
        switch (language) {
            case ('FR'): 
                listWordForm.add('Article défini');
                listWordForm.add('Symbole');
                listWordForm.add('Préposition');
                listWordForm.add('Adverbe');
                listWordForm.add('Verbe');
                listWordForm.add('Adjectif numéral');
                listWordForm.add('Forme de verbe');
                listWordForm.add('Forme d’adjectif');
                listWordForm.add('Pronom personnel');
                listWordForm.add('Préposition');
                listWordForm.add('Adverbe');
                listWordForm.add('Verbe');
                listWordForm.add('Conjonction de coordination');
                listWordForm.add('Article partitif');
                listWordForm.add('Forme d’adjectif indéfini');
                listWordForm.add('Conjonction');
                listWordForm.add('Adjectif');
                listWordForm.add('Adjectif possessif');
                listWordForm.add('Adjectif indéfini');
                listWordForm.add('Adjectif démonstratif');
                listWordForm.add('Forme d’adjectif démonstratif');
                listWordForm.add('Forme d’adjectif possessif');
                listWordForm.add('Adverbe interrogatif');
                break;
            case ('EN'):
                listWordForm.add('Verb');
                listWordForm.add('Preposition');
                listWordForm.add('Article');
                listWordForm.add('Pronoun');
                listWordForm.add('Adjective');
                listWordForm.add('Conjunction');
                listWordForm.add('Particle');
                listWordForm.add('Determiner');
                listWordForm.add('Letter');
                listWordForm.add('Numeral');
                listWordForm.add('Adverb');
                break;
        }
        return listWordForm;
};

/**
 * return
 * @param {object} textToAnalyse - the text must be analyzed
 * @param {object} language - the source language of the text to be analyzed
 */
function getKeysWords(textToAnalyse, language){{
        textToAnalyse = Normalizer.normalize(textToAnalyse, Normalizer.Form.NFD);
        textToAnalyse = textToAnalyse.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        var wordsToAnalyse = textToAnalyse.replaceAll("[^a-zA-Z ]", " ").toLowerCase().split("\\s+");
        var languages =  Arrays.asList('EN', 'FR');
        var defaultlanguage = languages.indexOf(language);
    return listSkill(wordsToAnalyse, languages, defaultlanguage);
}
/**
 * return
 * @param {object} textToAnalyse - the text must be analyzed
 * @param {object} language - the source language of the text to be analyzed
 */
   function listSkill(wordsToAnalyse, languages, defaultlanguage) {
    var nbWordUnknownInThislanguage = 0;
    if (defaultlanguage < 0) defaultlanguage = 0;
        var listWordForm = getWordFormToExclude(languages.get(defaultlanguage));
    
    array.forEach(wordToAnalyse => word {
      //TODO : tester si word est différent de null
        var word = analyseWord(wordToAnalyse, languages.get(defaultlanguage));
        //contains java = include en JS
        if (listWordForm.include(word.getWordform())) {
            if (word.getWordform().equals(Word.ALL_WORD_FROM.UNKNOWN.toString())) {
                nbWordUnknownInThislanguage++;
            }
            listSkill.add(word.getValue());
        }
        if (languages.size() > 1 && wordsToAnalyse.length > 1 && nbWordUnknownInThislanguage > wordsToAnalyse.length / 2) {
            languages.remove(defaultlanguage);
            return listSkill(wordsToAnalyse, languages, 0);
        }
    });
    return listSkill;
}

/**
 * return
 * @param {object} wordToAnalyse - the word must be analyzed
 * @param {object} language - the source language of the text to be analyzed
 */
function analyseWord(wordToAnalyse, language){
    var wordGraphDB = new WordGraphDB();
    var word = new Word(wordToAnalyse, language);
    word = wordGraphDB.searchWordGraphDataBase(word);
    if (word.getWordform() != null && !word.getWordform().isEmpty()) {
        return word;
    }
    word = wikiConnector.getWordFormFromWiki(wordToAnalyse, language);
    wordGraphDB.mergeWordGraphDatabase(word);
    return word;
}