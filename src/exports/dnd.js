var Dnd = {};
Dnd.Core = Dnd.Core || {};
Dnd.Core.version = '1.0.0';

Dnd.Core.rndStat = function(){
    let roll = [
        (Math.floor(Math.random() * 6)) + 1,
        (Math.floor(Math.random() * 6)) + 1,
        (Math.floor(Math.random() * 6)) + 1,
        (Math.floor(Math.random() * 6)) + 1,
    ]
    return roll.sort((a, b) => { return a - b}).slice(1, roll.length).reduce((a, b) => {return a + b});
}

Dnd.Core.rollStats = function(){
    let stats = [
        this.rndStat(),
        this.rndStat(),
        this.rndStat(),
        this.rndStat(),
        this.rndStat(),
        this.rndStat(),
        this.rndStat()
    ]
    
    return stats = stats.sort((a, b) => { return b - a});
}

Dnd.Core.addRacialBonuses = function(){
    switch(this.character.race){
        case 'DwarfHill': return this.create(Dnd.abilities.DwarfHill); 
        case 'DwarfMountain': return this.create(Dnd.abilities.DwarfMountain);
        case 'ElfHigh': return this.create(Dnd.abilities.ElfHigh);
        case 'ElfWood': return this.create(Dnd.abilities.ElfWood);
        case 'ElfDrow': return this.create(Dnd.abilities.ElfDrow);
        case 'ElfEladrin': return this.create(Dnd.abilities.ElfEladrin);
        case 'HalflingLightfoot': return this.create(Dnd.abilities.HalflingLightfoot);
        case 'HalflingStout': return this.create(Dnd.abilities.HalflingStout);
        case 'HalfOrc': return this.create(Dnd.abilities.HalfOrc);
        case 'Human': return this.create(Dnd.abilities.Human);
        case 'HumanVariant': return this.create(Dnd.abilities.HumanVariant, 'humanVariant');
        case 'Dragonborn': return this.create(Dnd.abilities.DragonBorn);
        case 'GnomeForest': return this.create(Dnd.abilities.GnomeForest);
        case 'GnomeRock': return this.create(Dnd.abilities.GnomeRock);
        case 'HalfElf': return this.create(Dnd.abilities.HalElf, 'halfElf');
        case 'Tiefling': return this.create(Dnd.abilities.Tiefling);
        case 'Aarakocra': return this.create(Dnd.abilities.Aarakocra);
        case 'GenasiEarth': return this.create(Dnd.abilities.GenasiEarth)
        case 'GenasiFire': return this.create(Dnd.abilities.GenasiFire);
        case 'GenasiWater': return this.create(Dnd.abilities.GenasiWater);
        case 'GenasiAir': return this.create(Dnd.abilities.GenasiAir);
    }
}

Dnd.Core.createHalfElf = function(){

}

Dnd.Core.createHumanVariant = function(){

}


Dnd.Core.create = function(abilities, special) {
    if(special){
        if('HumanVariant') return this.createHumanVariant();
        if('HalfElf') return this.createHalfElf();
    }

    for(const key in abilities){
        this.character.racialAbilities[key] = abilities[key];
    }
}


Dnd.races = ['DwarfHill', 'DwarfMountain', 'ElfHigh', 'ElfWood', 'ElfDrow', 'ElfEladrin', 'HalflingLightfoot', 'HalflingStout', 'HalfOrc', 'Tiefling', 'Human', 'HumanVariant', 'Dragonborn', 'GnomeForest', 'GnomeRock', 'HalfElf', 'Aarakocra', 'GenasiAir', 'GenasiEarth', 'GenasiFire', 'GenasiWater']
Dnd.classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
Dnd.skillsList = ['acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival'];
Dnd.abilityScores = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

Dnd.abilities = {};
Dnd.abilities.DwarfHill = { con: 2, wis: 1};
Dnd.abilities.DwarfMountain = { str: 2, con: 1};
Dnd.abilities.ElfHigh = { dex: 2, int: 1};
Dnd.abilities.ElfWood = { dex: 2, wis: 1};
Dnd.abilities.ElfDrow = { dex: 2, cha: 1};
Dnd.abilities.ElfEladrin = { dex: 2, int: 1};
Dnd.abilities.HalflingLightfoot = { dex: 2, cha: 1};
Dnd.abilities.HalflingLightfoot = { dex: 2, cha: 1};
Dnd.abilities.HalfOrc = { str: 2, con: 1};
Dnd.abilities.Tiefling = { int: 1, cha: 2};
Dnd.abilities.Human = {str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1};
Dnd.abilities.HumanVariant = {};
Dnd.abilities.Dragonborn = {str: 2, cha: 1};
Dnd.abilities.GnomeForest = {dex: 1, int: 2};
Dnd.abilities.GnomeRock = {str: 2, cha: 1 };
Dnd.abilities.HalfElf = { cha: 1 };
Dnd.abilities.Tiefling = { int: 1, cha: 2 };
Dnd.abilities.Aarakocra = { dex: 2, wis: 1 };
Dnd.abilities.GenasiEarth = { con: 2, str: 1 };
Dnd.abilities.GenasiFire = { con: 2, int: 1 };
Dnd.abilities.GenasiWater = { con: 2, wis: 1 };
Dnd.abilities.GenasiAir = { con: 2, dex: 1 };

Dnd.Core.calibrateStats = function(classAbilities, stats){
    let keys = Object.keys(this.character.abilities);
    stats = stats.sort((a, b) => {return b - a});
    stats.pop();  
    classAbilities.forEach( (ability) => {
        keys = keys.filter( (key) => { if(ability != key) return ability});
        this.character.abilities[ability] += stats[0];
        stats = stats.slice(1, stats.length);
    });
    stats = stats.sort(() => Math.random() - 0.5);
    stats.forEach((stat, i) => {
        this.character.abilities[keys[i]] += stats[i];
    })
}

Dnd.Core.setProficiencies = function(proficiencyCount, skills){
    skills = skills.sort(() => Math.random() - 0.5);
    for(let i = 0; i < proficiencyCount; i++){
        this.character.proficiencies.push(skills[i]);
    }
}

Dnd.skills = {};
Dnd.skills.Barbarian = ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'];
Dnd.skills.Bard = Dnd.skillsList;
Dnd.skills.Cleric = ['history', 'insight', 'medicine', 'persuasion', 'religion'];
Dnd.skills.Druid = ['arcana', 'animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion'];
Dnd.skills.Fighter = ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'];
Dnd.skills.Monk = ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'];
Dnd.skills.Paladin = ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'];
Dnd.skills.Ranger = ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception'];
Dnd.skills.Rogue = ['acrobatics', 'athletics', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'sleightOfHand', 'stealth'];
Dnd.skills.Sorcerer = ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'];
Dnd.skills.Warlock = ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'];
Dnd.skills.Wizard = ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'];

Dnd.saves = {};
Dnd.saves.Barbarian = ['str', 'con'];
Dnd.saves.Bard = ['dex', 'cha'];
Dnd.saves.Cleric = ['wis', 'cha'];
Dnd.saves.Druid = ['int', 'wis'];
Dnd.saves.Fighter = ['str', 'con'];
Dnd.saves.Monk = ['str', 'dex'];
Dnd.saves.Paladin = ['wis', 'cha'];
Dnd.saves.Ranger = ['str', 'dex'];
Dnd.saves.Rogue = ['dex'];
Dnd.saves.Sorcerer = ['con', 'cha'];
Dnd.saves.Warlock = ['wis', 'cha'];
Dnd.saves.Wizard = ['int', 'cha'];

Dnd.Core.setSaves = function(saves){
    this.character.savingThrows = saves;
};

Dnd.Core.character = {};

Dnd.Core.applyClassBonuses = function(stats){
    switch(this.character.class){
        case 'Barbarian': this.calibrateStats(['str'], stats);
            this.setSaves(Dnd.saves.Barbarian);
            this.setProficiencies(2, Dnd.skills.Barbarian);
        break;
        case 'Bard': this.calibrateStats(['cha'], stats);
            this.setSaves(Dnd.saves.Bard);
            this.setProficiencies(3, Dnd.skills.Bard);
        break; 
        case 'Cleric': this.calibrateStats(['wis', 'cha'], stats);
            this.setSaves(Dnd.saves.Cleric);
            this.setProficiencies(2, Dnd.skills.Cleric);
        break;
        case 'Druid': this.calibrateStats(['int', 'wis'], stats);
            this.setSaves(Dnd.saves.Druid);
            this.setProficiencies(2, Dnd.skills.Druid);
        break;
        case 'Fighter': this.calibrateStats(['str', 'dex'], stats);
            this.setSaves(Dnd.saves.Fighter);
            this.setProficiencies(2, Dnd.skills.Fighter);
        break;
        case 'Monk': this.calibrateStats(['dex', 'wis'], stats);
            this.setSaves(Dnd.saves.Bard);
            this.setProficiencies(3, Dnd.skills.Monk)
        break;
        case 'Paladin': this.calibrateStats(['str, cha'], stats);
            this.setSaves(Dnd.saves.Paladin);    
            this.setProficiencies(2, Dnd.skills.Paladin);
        break;
        case 'Ranger': this.calibrateStats(['dex', 'wis'], stats);
            this.setSaves(Dnd.saves.Ranger);    
            this.setProficiencies(3, Dnd.skills.Ranger)
        break;
        case 'Rogue': this.calibrateStats(['dex'], stats);
            this.setSaves(Dnd.saves.Rogue);    
            this.setProficiencies(4, Dnd.skills.Rogue);    
        break;
        case 'Sorcerer': this.calibrateStats(['cha'], stats);
            this.setSaves(Dnd.saves.Sorcerer);    
            this.setProficiencies(2, Dnd.skills.Sorcerer);
        break;
        case 'Warlock': this.calibrateStats(['cha'], stats);
            this.setSaves(Dnd.saves.Warlock);    
            this.setProficiencies(2, Dnd.skills.Warlock);
        break;
        case 'Wizard': this.calibrateStats(['int'], stats);
            this.setSaves(Dnd.saves.Wizard);    
            this.setProficiencies(2, Dnd.skills.Wizard)
        break;
    }
}

Dnd.Core.applyLevels = function(){
    for(var i = 0; i < this.character.level; i++){
        if(i === 4 || i === 8 || i === 12 || i === 16 || i === 19){
            this.increaseAbilityScore();
            
        } 
    }
};

Dnd.Core.increaseAbilityScore = function(){
    switch(this.character.class){
        case 'Barbarian': return this.increaseAbilities(['str', 'con']); 
        case 'Bard': return this.increaseAbilities(['cha', 'dex']); 
        case 'Cleric': return this.increaseAbilities(['wis', 'cha']);
        case 'Druid': return this.increaseAbilities(['int', 'wis']);
        case 'Fighter': return this.increaseAbilities(['str', 'con']);
        case 'Monk': return this.increaseAbilities(['dex', 'wis']);
        case 'Paladin': return this.increaseAbilities(['wis', 'cha']);
        case 'Ranger': return this.increaseAbilities(['dex', 'wis'])
        case 'Rogue': return this.increaseAbilities(['dex', 'int']);
        case 'Sorcerer': return this.increaseAbilities(['cha', 'con']);
        case 'Warlock': return this.increaseAbilities(['wis', 'cha']);
        case 'Wizard': return this.increaseAbilities(['int', 'wis']);
    }
};

Dnd.Core.increaseAbilities = function(abilities){
    // Implement safeguard against a skill being raised above 20. 
    // We will need to change the way the racial bonuses are added.
    let count = Math.floor(Math.random() * 2) + 1;
    if(count > 1){
        return this.increaseAbility(this.getAbilityByWeight(this.getRandomElement(abilities)), 2);
    }
    else {
        this.increaseAbility(this.getAbilityByWeight(this.getRandomElement(abilities)), 1);
        this.increaseAbility(this.getAbilityByWeight(this.getRandomElement(abilities)), 1);
    }
    
}

Dnd.Core.increaseAbility = function(ability, scoreIncrease){
    this.character.abilities[ability] += scoreIncrease;
}

Dnd.Core.getAbilityByWeight = function(primaryAbility){
    var index = Dnd.abilityScores.indexOf(primaryAbility);
    var weights = [10, 10, 10, 10, 10, 10];
    weights[index] *= 15;
    var totalWeight = weights.reduce((a, b) => {return a + b});
    var weightSum = Math.floor(Math.random() * totalWeight);
    for(var i = 0; i < weights.length; i++){
        weightSum -= weights[i];
        if(weightSum <= 0) return Dnd.abilityScores[i];
    }
}

Dnd.Core.setSaves = function(){
    switch(this.character.class){
        case 'Barbarian': return this.character.savingThrows = ['str', 'con'];
        case 'Bard': return this.character.savingThrows = ['cha', 'dex'];
        case 'Cleric': return this.character.savingThrows = ['wis', 'cha'];
        case 'Druid': return this.character.savingThrows =  ['int', 'wis'];
        case 'Fighter': return this.character.savingThrows =  ['str', 'con'];
        case 'Monk': return this.character.savingThrows =  ['str', 'dex'];
        case 'Paladin': return this.character.savingThrows =  ['wis', 'cha'];
        case 'Ranger': return this.character.savingThrows =  ['str', 'dex'];
        case 'Rogue': return this.character.savingThrows =  ['dex', 'int'];
        case 'Sorcerer': return this.character.savingThrows =  ['con', 'cha'];
        case 'Warlock': return this.character.savingThrows =  ['wis', 'cha'];
        case 'Wizard': return this.character.savingThrows =  ['int', 'cha'];
    }
};

Dnd.Core.characters = [];

Dnd.Core.createStatBlock = function(characterRace, characterClass, level){
    let character = new DndCharacter();
    character.level = level;
    character.proficiencyBonus = DndCharacter.proficiencyLevels[character.level];
    character.class = characterClass;
    character.savingThrows = this.setSaves(character.class);
    character.race = characterRace;    
    this.character = character;
    let stats = this.rollStats();
    this.addRacialBonuses();
    this.applyClassBonuses(stats);
    this.applyLevels();
    console.log(character);
    character.setup();
    this.characters.push(character);
    return character;
}

Dnd.Core.createMultiStatBlock = function(count, characterRace, characterClass, level){
    for (let i = 0; i < count; i++){
        this.createStatBlock(characterRace, characterClass, level);
    }
}

Dnd.Core.getRandomElement = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

Dnd.Core.createRandomNpc = function(){
    let characterRace = this.getRandomElement(Dnd.races);
    let characterClass = this.getRandomElement(Dnd.classes);
    let level = Math.floor(Math.random() * 20) + 1;
    this.createStatBlock(characterRace, characterClass, level);
}



//============================================================================================

Dnd.Names = Dnd.Names || {};

//============================================================================================
// Character
//============================================================================================

function DndCharacter(){
    this.initialize.apply(this, arguments);
}

DndCharacter.prototype.constructor = DndCharacter;

DndCharacter.skillModifiers = new Map([
        ["acrobatics", "dex"],
        ["animalHandling", "wis"],
        ["arcana", "int"],
        ["athletics", "str"],
        ["deception", "cha"],
        ["history", "int"],
        ["insight", "wis"],
        ["intimidation", "cha"],
        ["investigation", "int"],
        ["medicine", "wis"],
        ["nature", "int"],
        ["perception", "wis"],
        ["performance", "cha"],
        ["persuasion", "cha"],
        ["religion", "int"],
        ["sleightOfHand", "dex"],
        ["stealth", "dex"],
        ["survival", "wis"]
    ]
    );

DndCharacter.proficiencyLevels = [2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6];
    
DndCharacter.prototype.ProficiencyBonus = function(){
    return DndCharacter.proficiencyLevels[this.level];
}

DndCharacter.prototype.checkProficiency = function(proficiency){
    if(this.expertise.includes(proficiency)) return this.proficiencyBonus * 2 + this.getAbilityModifier(DndCharacter.skillModifiers.get(proficiency));
    if(this.halfProficiencies.includes(proficiency)) return this.halfProficiency + this.getAbilityModifier(DndCharacter.skillModifiers.get(proficiency));
    if(this.proficiencies.includes(proficiency)) return this.proficiencyBonus + this.getAbilityModifier(DndCharacter.skillModifiers.get(proficiency));
    return this.getAbilityModifier(DndCharacter.skillModifiers.get(proficiency));
}

DndCharacter.prototype.Acrobatics = function(){ return this.checkProficiency('acrobatics')};
DndCharacter.prototype.AnimalHandling = function(){ return this.checkProficiency('animalHandling')};
DndCharacter.prototype.Arcana = function(){ return this.checkProficiency('arcana')};
DndCharacter.prototype.Athletics = function(){ return this.checkProficiency('athletics')};
DndCharacter.prototype.Deception = function(){ return this.checkProficiency('deception')};
DndCharacter.prototype.History = function(){ return this.checkProficiency('history')};
DndCharacter.prototype.Insight = function(){ return this.checkProficiency('insight')};
DndCharacter.prototype.Intimidation = function(){ return this.checkProficiency('intimidation')};
DndCharacter.prototype.Investigation = function(){ return this.checkProficiency('investigation')};
DndCharacter.prototype.Medicine = function(){ return this.checkProficiency('medicine')};
DndCharacter.prototype.Nature = function(){ return this.checkProficiency('nature')};
DndCharacter.prototype.Perception = function(){ return this.checkProficiency('perception')};
DndCharacter.prototype.Performance = function(){ return this.checkProficiency('performance')};
DndCharacter.prototype.Persuasion = function(){ return this.checkProficiency('persuasion')};
DndCharacter.prototype.Religion = function(){ return this.checkProficiency('religion')};
DndCharacter.prototype.SleightOfHand = function(){ return this.checkProficiency('sleightOfHand')};
DndCharacter.prototype.Stealth = function(){ return this.checkProficiency('stealth')};
DndCharacter.prototype.Survival = function(){ return this.checkProficiency('survival')};

DndCharacter.prototype.getAbilityModifier = function(ability){
    let skill = this.abilities[ability];
    if(skill > 10) {
        skill -= 10;
        return Math.floor(skill / 2);
    }
    else if(skill < 10){
        let sum = 10 - skill;
        if(!sum % 2) sum += 1;
        return Math.floor((sum / 2) * -1);
    }
    return 0;
}

DndCharacter.prototype.rollD20 = function(count){
    let rolls = [];
    for(let i = 0; i < count; i++){
        rolls.push(Math.floor(Math.random() * 20) + 1); 
    }
    return rolls.reduce((a, b) => {return a + b}); 
}

DndCharacter.prototype.skillCheck = function(skill){
    let roll = this.rollD20(1);
    let modifiers = this.checkProficiency(skill);
}

DndCharacter.prototype.initialize = function(){
    this.initAbilities();
    this.initSkills();
    this.initPassives();
    this.initSaves();
    this.racialAbilities = [];
    this.savingThrows = [];
    this.ac = 10;
    this.initiative = 0;
    this.proficiencyBonus = 0;
    this.halfProficiency = Math.floor(this.proficiencyBonus / 2);
    this.proficiencies = [];
    this.halfProficiencies = [];
    this.expertise = [];
}

DndCharacter.prototype.initAbilities = function (){
    this.abilities = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
    };
}

DndCharacter.prototype.initSkills = function (){
    this.skills = {
        acrobatics: 0,
        animalHandling: 0,
        arcana: 0,
        athletics: 0,
        deception: 0,
        history: 0,
        insight: 0,
        intimidation: 0,
        investigation: 0,
        medicine: 0,
        nature: 0,
        perception: 0,
        performance: 0,
        persuasion: 0,
        religion: 0,
        sleightOfHand: 0,
        stealth: 0,
        survival: 0,
    }
}

DndCharacter.prototype.initSaves = function (){
    this.saves = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
    };
}

DndCharacter.prototype.initPassives = function (){
    this.passives = {
        perception: 0,
        investigation: 0,
        insight: 0
    };
}

DndCharacter.prototype.Str = function(){ return this.getAbilityModifier('str') }
DndCharacter.prototype.Dex = function(){ return this.getAbilityModifier('dex') }
DndCharacter.prototype.Con = function(){ return this.getAbilityModifier('con') }
DndCharacter.prototype.Int = function(){ return this.getAbilityModifier('int') }
DndCharacter.prototype.Wis = function(){ return this.getAbilityModifier('wis') }
DndCharacter.prototype.Cha = function(){ return this.getAbilityModifier('cha') }

DndCharacter.prototype.StrSave = function(){ return this.getSaveModifier('str')}
DndCharacter.prototype.DexSave = function(){ return this.getSaveModifier('dex')}
DndCharacter.prototype.ConSave = function(){ return this.getSaveModifier('con')}
DndCharacter.prototype.IntSave = function(){ return this.getSaveModifier('int')}
DndCharacter.prototype.WisSave = function(){ return this.getSaveModifier('wis')}
DndCharacter.prototype.ChaSave = function(){ return this.getSaveModifier('cha')}

DndCharacter.prototype.AC = function(){
    return 10 + this.getAbilityModifier('dex');
}

DndCharacter.prototype.Initiative = function(){
    return this.getAbilityModifier('dex');  
}

DndCharacter.prototype.getSaveModifier = function(save){
    if(this.savingThrows.includes(save)) return this.proficiencyBonus + this.getAbilityModifier(save);
    return this.getAbilityModifier(save);
}

DndCharacter.prototype.getAbilities = function(){
    return {
        str: this.racialAbilities['str'] ? this.abilities.str + this.racialAbilities['str'] : this.abilities.str,
        dex: this.racialAbilities['dex'] ? this.abilities.dex + this.racialAbilities['dex'] : this.abilities.dex,
        con: this.racialAbilities['con'] ? this.abilities.con + this.racialAbilities['con'] : this.abilities.con,
        int: this.racialAbilities['int'] ? this.abilities.int + this.racialAbilities['int'] : this.abilities.int,
        wis: this.racialAbilities['wis'] ? this.abilities.wis + this.racialAbilities['wis'] : this.abilities.wis,
        cha: this.racialAbilities['cha'] ? this.abilities.cha + this.racialAbilities['cha'] : this.abilities.cha
    }
}

DndCharacter.prototype.setSkills = function(){
    this.skills = {
        acrobatics: this.Acrobatics(),
        animalHandling: this.AnimalHandling(),
        arcana: this.Arcana(),
        athletics: this.Athletics(),
        deception: this.Deception(),
        history: this.History(),
        insight: this.Insight(),
        intimidation: this.Intimidation(),
        investigation: this.Investigation(),
        medicine: this.Medicine(),
        nature: this.Nature(),
        perception: this.Perception(),
        performance: this.Performance(),
        persuasion: this.Persuasion(),
        religion: this.Religion(),
        sleightOfHand: this.SleightOfHand(),
        stealth: this.Stealth(),
        survival: this.Survival(),
    }
}

DndCharacter.prototype.setSaves = function(){
    this.saves = {
        str: this.StrSave(),
        dex: this.DexSave(),
        con: this.ConSave(),
        int: this.IntSave(),
        wis: this.WisSave(),
        cha: this.ChaSave()
    }
}

DndCharacter.prototype.setPassives = function(){
    this.passives = {
        perception: 10 + this.halfProficiency + this.getAbilityModifier('wis'),
        investigation: 10 + this.halfProficiency + this.getAbilityModifier('int'),
        insight: 10 + this.halfProficiency + this.getAbilityModifier('wis')
    }
}

DndCharacter.prototype.setProficiencies = function(){
    this.proficiencyBonus = DndCharacter.proficiencyLevels[this.level];
    this.halfProficiency = Math.floor(this.proficiencyBonus / 2);
}

DndCharacter.prototype.setup = function(){
    this.setProficiencies();
    this.setSkills();
    this.setSaves();
    this.setPassives();
    this.ac = this.AC();
    this.initiative = this.Initiative();
}

export default Dnd;