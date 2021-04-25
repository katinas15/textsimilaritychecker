function wordCountMap(str){
    let words = str.split(' ');
    let wordCount = {};
    words.forEach((w)=>{
        wordCount[w] = (wordCount[w] || 0) +1;

    });

    // {
    //     text: 1,
    //     message: 1
    // }


    // {
    //     data: 1,
    //     minig: 1
    // }
    return wordCount;
    
}

function addWordsToDictionary(wordCountmap, dict) {
    //surandami visi zodziai
    for(let key in wordCountmap){
        dict[key] = true;
    }

    // {
    //     text: true,
    //     message: true,
    //     data: true,
    //     mining:true
    // }
}
function wordMapToVector(map, dict) {
    //pagal count sudedame i vektoriu
    let wordCountVector = [];
    for (let term in dict){
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;

    // {1,1,0,0}
}
function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}

function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

const determinant = (vec) => {
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return sum;
}

function cosineSimilarity(vecA,vecB){
    return dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA,txtB){
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return cosineSimilarity(vectorA, vectorB);
}

function getSimilarityScore(val){
    return Math.round(val * 100)
}







const textDiceSimilarity = (txtA,txtB) => {
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return diceSimilarity(vectorA, vectorB);
}

const diceSimilarity = (vecA, vecB) => {
    console.log(dotProduct(vecA, vecB))
    console.log(determinant(vecA))
    console.log(determinant(vecA) + determinant(vecB))
    console.log(2 * (dotProduct(vecA,vecB)/ (determinant(vecA) + determinant(vecB))))
    return 2 * (dotProduct(vecA,vecB)/ (determinant(vecA) + determinant(vecB)));
}







const textJaccardSimilarity = (txtA,txtB) => {
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return jaccardSimilarity(vectorA, vectorB);
}

const jaccardSimilarity = (vecA, vecB) => {
    return dotProduct(vecA,vecB)/ (determinant(vecA) + determinant(vecB) - dotProduct(vecA,vecB));
}







const textOverlapSimilarity = (txtA,txtB) => {
    const wordCountA = wordCountMap(txtA);
    const wordCountB = wordCountMap(txtB);
    let dict = {};
    addWordsToDictionary(wordCountA,dict);
    addWordsToDictionary(wordCountB,dict);
    const vectorA = wordMapToVector(wordCountA,dict);
    const vectorB = wordMapToVector(wordCountB,dict);
    return overlapSimilarity(vectorA, vectorB);
}

const overlapSimilarity = (vecA, vecB) => {
    return dotProduct(vecA,vecB)/ Math.min(determinant(vecA), determinant(vecB));
}







const checkAll = () => {
    checkCosine()
    checkDice()
    checkJaccard()
    checkOverlap()
}


function checkCosine(){
    const text1 = $('#text1').val();
    const text2 = $('#text2').val();
    const similarity = textCosineSimilarity(text1,text2) * 100;
    $("#similarity").text(similarity+"%");
}

const checkDice = () => {
    const text1 = $('#text1').val();
    const text2 = $('#text2').val();
    const similarity = textDiceSimilarity(text1, text2) * 100
    $("#dice").text(similarity+"%");
}

const checkJaccard = () => {
    const text1 = $('#text1').val();
    const text2 = $('#text2').val();
    const similarity = textJaccardSimilarity(text1, text2) * 100
    $("#jaccard").text(similarity+"%");
}

const checkOverlap = () => {
    const text1 = $('#text1').val();
    const text2 = $('#text2').val();
    const similarity = textOverlapSimilarity(text1, text2) * 100
    $("#overlap").text(similarity+"%");
}