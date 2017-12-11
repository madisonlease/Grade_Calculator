//calculate current grade by adding weighted averages from each category
function calculateCurrentGrade(){

    //take input from grade boxes
    var testInput = document.getElementById("testGrades").value;
    var quizInput = document.getElementById("quizGrades").value;
    var homeworkInput = document.getElementById("homeworkGrades").value;
    var midtermInput = document.getElementById("midtermGrades").value;

    //take input from weight boxes
    var testWeight=parseInt(document.getElementById("testWeight").value)/100;
    var quizWeight=parseInt(document.getElementById("quizWeight").value)/100;
    var homeworkWeight=parseInt(document.getElementById("homeworkWeight").value)/100;
    var midtermWeight=parseInt(document.getElementById("midtermWeight").value)/100;

    //get rows
    var testRow=document.getElementById("testRow");
    var quizRow=document.getElementById("quizRow");
    var homeworkRow=document.getElementById("homeworkRow");
    var midtermRow=document.getElementById("midtermRow");

    //find test grade weighted average and push to web page
    var testGrades=stringToArrayOfNumbers(testInput);
    if(!checkIfNumber(testGrades)) {
        return;
    }
    var testAverage=calculateAverage(testGrades);
    colorRows(testAverage,testRow);
    var testWeightedAverage=averageWithWeight(testAverage,testWeight);
    document.getElementById("output1").innerHTML=testWeightedAverage.toFixed(0);

    //find quiz grade weighted average and push to web page
    var quizGrades=stringToArrayOfNumbers(quizInput);
    if(!checkIfNumber(quizGrades)) {
        return;
    }
    var quizAverage=calculateAverage(quizGrades);
    colorRows(quizAverage,quizRow);
    var quizWeightedAverage=averageWithWeight(quizAverage,quizWeight);
    document.getElementById("output2").innerHTML=quizWeightedAverage.toFixed(0);

    //find homework grade weighted average and push to web page
    var homeworkGrades=stringToArrayOfNumbers(homeworkInput);
    if(!checkIfNumber(homeworkGrades)) {
        return;
    }
    var homeworkAverage=calculateAverage(homeworkGrades);
    colorRows(homeworkAverage,homeworkRow);
    var homeworkWeightedAverage=averageWithWeight(homeworkAverage,homeworkWeight);
    document.getElementById("output3").innerHTML=homeworkWeightedAverage.toFixed(0);

    //find midterm grade weighted average and push to web page
    var midtermGrades=stringToArrayOfNumbers(midtermInput);
    if(!checkIfNumber(midtermGrades)) {
        return;
    }
    var midtermAverage=calculateAverage(midtermGrades);
    colorRows(midtermAverage,midtermRow);
    var midtermWeightedAverage=averageWithWeight(midtermAverage,midtermWeight);
    document.getElementById("output4").innerHTML=midtermWeightedAverage.toFixed(0);

    //calculate current grade and push to web page
    var currentGrade=testWeightedAverage+quizWeightedAverage+homeworkWeightedAverage+midtermWeightedAverage;
    document.getElementById("output5").innerHTML=currentGrade.toFixed(0);
    return currentGrade;
}

//convert string from text box into array of numbers
function stringToArrayOfNumbers(input) {
    var grades=input.split(",");
    return grades;
}

//check if user entered any non numbers as grades
function checkIfNumber(grades){
    for (var i = 0; i < grades.length; i++){
        if (isNaN(grades[i])){
            document.getElementById("output7").innerHTML="You typed in a non-number. Please use numbers only to find grade.";
            return false;
        }
    }
    return true;
}

//calculate average grade in a category by adding all grades up and dividing by number of grades
function calculateAverage(grades){
    var numbers = 0;
    for (var i = 0; i <= grades.length - 1; i++) {
        var gradeNumber = parseInt(grades[i]);
        numbers += gradeNumber;
    }
    var average = numbers / grades.length;
    return average;
}

//calculate the weighted average of a subject by multiplying the average by the weight/100
function averageWithWeight(average, weight){
    var weightedAverage=average*weight;
    return weightedAverage;
}

//calculate the grade that you need to get on the final in order to get desired grade overall
function calculateGradeNeeded(){
    var currentGrade=calculateCurrentGrade();
    var finalWeight=parseInt(document.getElementById("finalWeight").value);
    checkWeights(finalWeight);
    var gradeDesired=parseInt(document.getElementById("gradeDesired").value);
    var gradeNeeded=((gradeDesired*100)-(currentGrade*(100-finalWeight)))/finalWeight;
    document.getElementById("output6").innerHTML=gradeNeeded.toFixed(0);
}

//check if weights add up to 100%
function checkWeights(finalWeight){
    var testWeight=parseInt(document.getElementById("testWeight").value);
    var quizWeight=parseInt(document.getElementById("quizWeight").value);
    var homeworkWeight=parseInt(document.getElementById("homeworkWeight").value);
    var midtermWeight=parseInt(document.getElementById("midtermWeight").value);

    if(finalWeight+testWeight+quizWeight+homeworkWeight+midtermWeight!==100){
        document.getElementById("output8").innerHTML="Your weights do not add up to 100%.";
    }
}

//color each category row based on score average
function colorRows(average, row){
    if (average>=70 && average<80){
        row.style.background="palegreen";
    }else if (average>=80 && average<90){
        row.style.background="green";
    }else if (average>=90){
        row.style.background="darkgreen";
    }else{
        row.style.background="red";
    }
}