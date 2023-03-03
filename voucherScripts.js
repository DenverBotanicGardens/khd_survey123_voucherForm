//This script is used primarily to transform and concatenate user provided answers into strings that conform with the DarwinCore and/or symbiota fields
//pulldata commands are to be places in the 'calculation' column of the Survey123 XLSForm on the survey tab

//convert an object into a string
//pulldata("@javascript", "voucherScripts.js", "objToStr", ${inObj})
function objToStr(inObj) {
	var str = inObj.toString()
    return str
}

//replace any underscores in a string with spaces
//pulldata("@javascript", "voucherScripts.js", "findandreplace", ${inStr}, ${findstr}, ${replacestr})
function findandreplace(inStr, findstr, replacestr) {
    var inStrSt= inStr.toString()
         return inStrSt.split(findstr).join(replacestr);
}
    
//TERRAIN
//pulldata("@javascript", "voucherScripts.js", "terrainAdmin", ${terrain}, ${terrain_other})
function terrainAdmin(terrain, terrain_other) {
    var terrainStr = terrain.toString()
    if (terrain && !terrain.includes('other')) {
        return `Terrain: ${terrainStr}.`
    } else if (terrainStr == 'other'){
        return `Terrain: ${terrain_other}.`
    } else if (terrain && terrainStr.includes('other')){
        terrainStr = terrainStr.replace(/other, /g,'').replace(/other,/g,'').replace(/other/g,'').replace(/,other/g,'')
        return `Terrain: ${terrainStr} ${terrain_other}.`
    } else {
        return ''
    }
}

//SOIL
//pulldata("@javascript", "voucherScripts.js", "soilAdmin", ${soilTypes}, ${soil})
function soilAdmin(soilTypes,soil) {
	var soilTypesStr = soilTypes.toString()
	var soilNotesStr = soil.toString()
	if (soilTypes && soil) {
	return `Soil description: ${soilTypesStr}. ${soilNotesStr}.`;
	} else if (soilTypes && !soil){
	return `Soil description: ${soilTypesStr}.`;
	} else if (!soilTypes && soil){
	return `Soil description: ${soilNotesStr}.`;
	} else {
	return ''}
}

//FREQUENCY
//pulldata("@javascript", "voucherScripts.js", "freqAdmin", ${frequency})
function freqAdmin(frequency){
    var freqStr = frequency.toString()
    if (frequency){
        return `Estimated frequency within viewshed: ${frequency}.`
    } else {
        return ''
    }
}

//TISSUE SAMPLE for occurrenceRemarks
//pulldata("@javascript", "voucherScripts.js", "tissueRemarks", ${tissueSample}, ${tissueProvenance})
function tissueRemarks(tissueSample, tissueProvenance){
    if (tissueSample == 'yes' && tissueProvenance == 'sameIndividual'){
        return 'Tissue sample collected.'
    }else if (tissueSample == 'yes' && tissueProvenance == 'samePopulation'){
        return 'Tissue sample collected from another individual in the same population.'
    } else if (tissueSample == 'no'){
        return ''
    } else {
        return ''
    }
}

//OCCURRENCE REMARKS
//pulldata("@javascript", "voucherScripts.js", "concatOccRem", ${frequencyAdmin}, ${tissueSampleAdmin}, ${additionalRemarks})
function concatOccRem(frequencyAdmin,tissueSampleAdmin,additionalRemarks){
        return `${frequencyAdmin} ${tissueSampleAdmin} ${additionalRemarks}`
}

//HABIT
//pulldata("@javascript", "voucherScripts.js", "habitAdmin", ${habit}, ${habit_other})
function habitAdmin(habit, habit_other){
    var habitStr = habit.toString()
    if (habit && !habit.includes('other')) {
        return `Habit: ${habit}.`
    } else if (habitStr == 'other'){
        return `Habit: ${habit_other}.`
    } else if (habit && habitStr.includes('other')){
        habitStr = habitStr.replace(/other, /g,'').replace(/other,/g,'').replace(/other/g,'').replace(/,other/g,'')
        return `Habit: ${habitStr} ${habit_other}.`
    } else {
        return ''
    }
}


//GRAMINOID HABIT
//pulldata("@javascript", "voucherScripts.js", "gramHabitAdmin", ${graminoid})
function gramHabitAdmin(graminoid){
    if (graminoid){
        return `Graminoid habit: ${graminoid}.`
    } else {
        return ''
    }
}

//LIFE CYCLE HABIT
//pulldata("@javascript", "voucherScripts.js", "lifeCycleAdmin", ${lifeCycleHabit})
function lifeCycleAdmin(lifeCycleHabit){
    if (lifeCycleHabit){
        return `Life cycle habit: ${lifeCycleHabit}.`
    } else {
        return ''
    }
}

//FLOWER COLOR
//pulldata("@javascript", "voucherScripts.js", "flowerColorAdmin", ${flowerColor})
function flowerColorAdmin(flowerColor){
    if (flowerColor){
        return `Flower color: ${flowerColor}.`
    } else {
        return ''
    }
}

//HEIGHT IN CM
//pulldata("@javascript", "voucherScripts.js", "heightAdmin", ${heightInCentimeters})
function heightAdmin(heightInCentimeters){
    if (heightInCentimeters){
        return `Approximate height in centimeters: ${heightInCentimeters}.`
    } else {
        return ''
    }
}

//ADDITIONAL DESCRIPTION
//pulldata("@javascript", "voucherScripts.js", "addDescriptionAdmin", ${additionalDescription})
function addDescriptionAdmin(additionalDescription){
    if (additionalDescription){
        return `Additional description: ${additionalDescription}.`
    } else {
        return ''
    }
}

//DESCRIPTION COLLATE
//collates all description data into symbiota field 'description'/'verbatimRemarks'
//pulldata("@javascript", "voucherScripts.js", "habitatCollate", ${habitAdmin}, ${gramHabitAdmin}, ${lifeHistHabitAdmin}, ${flowerColorAdmin}, ${heightInCmAdmin}, ${additionalDescriptionAdmin})
function habitatCollate(habitAdmin,gramHabitAdmin,lifeHistHabitAdmin,flowerColorAdmin,heightInCmAdmin,additionalDescriptionAdmin){
    var habitatString = `{habitAdmin},{gramHabitAdmin},{lifeHistHabitAdmin},{flowerColorAdmin},{heightInCmAdmin},{additionalDescriptionAdmin}`
    return habitatString.replace(/  /g,' ')
}



//HABITAT TYPE
//pulldata("@javascript", "voucherScripts.js", "habitatTypeAdmin", ${habitat_specific})
function habitatTypeAdmin(habitat_specific){
    var habitatStr = habitat_specific.toString()
    habitatStr = habitatStr.replace(/_rm/g,'').replace(/_wpc/g,'').replace(/_epf/g,'').replace(/_/g," ")
    if (habitat_specific){
        return `${habitatStr}.`
    }
}


//MICROHABITAT
//pulldata("@javascript", "voucherScripts.js", "microHabitatAdmin", ${microhabitat})
function microHabitatAdmin(microhabitat){
    if (microhabitat){
        return `Area immediately surrounding specimen: ${microhabitat}.`
    } else {
        return ''
    }
}

//LANDUSE/DISTURBANCES
//pulldata("@javascript", "voucherScripts.js", "disturbancesAdmin", ${disturbance}, ${disturbance_other})
function disturbancesAdmin(disturbance,disturbance_other){
    var disturbanceStr = disturbance.toString()
    if (disturbance && !disturbance.includes('other')) {
        return `Land use/disturbance history: ${disturbance}.`
    } else if (disturbanceStr == 'other'){
        return `Land use/disturbance history: ${disturbance_other}.`
    } else if (disturbance && disturbanceStr.includes('other')){
        disturbanceStr = disturbanceStr.replace(/other, /g,'').replace(/other,/g,'').replace(/other/g,'').replace(/,other/g,'')
        return `Land use/disturbance history: ${disturbanceStr} ${disturbance_other}.`
    } else {
        return ''
    }
}

//SLOPE
//pulldata("@javascript", "voucherScripts.js", "slopeAdmin", ${slope})
function slopeAdmin(slope){
    if (slope) {
        return `Estimated slope in degrees: ${slope}.`
    } else {
        return ''
    }
}

//ASPECT
//pulldata("@javascript", "voucherScripts.js", "aspectAdmin", ${aspect})
function aspectAdmin(aspect){
    if (aspect) {
        return `Slope aspect: ${aspect}.`
    } else {
        return ''
    }
}


//HABITAT COLLATE
//collates all habitat descriptors into DwC field 'habitat'
//pulldata("@javascript", "voucherScripts.js", "habitatCollate", ${habitatTypeAdmin}, ${disturbancesAdmin}, ${terrainAdmin}, ${microHabitatAdmin}, ${soilAdmin}, ${slopeAdmin}, ${aspectAdmin})
function habitatCollate(habitatTypeAdmin,disturbancesAdmin,terrainAdmin,microHabitatAdmin,soilAdmin,slopeAdmin,aspectAdmin){
    var habitatString = `${habitatTypeAdmin} ${disturbancesAdmin} ${terrainAdmin} ${microHabitatAdmin} ${soilAdmin} ${slopeAdmin} ${aspectAdmin}`
    return habitatString.replace(/  /g,' ')
}




//MATERIAL SAMPLE for symbiota

//materialSample-sampleType
//pulldata("@javascript", "voucherScripts.js", "matSamType", ${tissueSample})
function matSampType(tissueSample){
    if (tissueSample == 'yes'){
        return 'tissue'
    } else{
        return ''
    }
}


//materialSample-disposition
//pulldata("@javascript", "voucherScripts.js", "matSampDisposition", ${tissueSample})
function matSampDisposition(tissueSample){
    if (tissueSample == 'yes'){
        return 'in collection'
    } else{
        return ''
    }
}

//materialSample-preservationType
//pulldata("@javascript", "voucherScripts.js", "matSampPresType", ${tissueSample})
function matSampPresType(tissueSample){
    if (tissueSample == 'yes'){
        return 'dessicated'
    } else{
        return ''
    }
}

//materialSample-materialSampleID
//pulldata("@javascript", "voucherScripts.js", "matSampID", ${tissueMaterialSampleID})
function matSampID(tissueMaterialSampleID){
    if (tissueMaterialSampleID){
        return tissueMaterialSampleID
    } else{
        return ''
    }
}


//DYNAMIC PROPERTIES
//pulldata("@javascript", "voucherScripts.js", "dynamicPropertiesAdmin", ${habit}, ${graminoid}, ${lifeCycleHabit}, ${flowerColor}, ${heightInCentimeters}, ${additionalDescription})
function dynamicPropertiesAdmin(habit,graminoid,lifeCycleHabit,flowerColor,heightInCentimeters,additionalDescription){
    var dynaP = []
    if (habit){
        dynaP.push(`"habit":"${habit}"`)
    }
    if (graminoid){
        dynaP.push(`"graminoidHabit":"${graminoid}"`)
    }
    if (lifeCycleHabit){
        dynaP.push(`"lifeCycleHabit":"${lifeCycleHabit}"`)
    }
    if (flowerColor){
        dynaP.push(`"flowerColor":"${flowerColor}"`)
    }
    if (heightInCentimeters){
        dynaP.push(`"heightInCentimeters":${heightInCentimeters}`)
    }
    if (additionalDescription){
        dynaP.push(`"additionalDescription":"${additionalDescription}"`)
    }
    if (dynaP.length > 0){
        return `{${dynaP}}`
    } else {
        return ''
    }
}
