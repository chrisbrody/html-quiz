// create variables to add premade questions and user answers too
var questionArray = []
var usersAnswers = []

// new questions
var q1 = new Question('what is correct way to create the HTML doctype?', '<DOCTPYE>', '<!DOCTYPE>', '!DOCTYPE', 'What is a doc type?', '<!DOCTYPE>')
var q2 = new Question('what is correct way to create a header 1 element?', '<h2></h2>', '</h1><h1>', '<h1><h1>', '<h1></h1>', '<h1></h1>')
var q3 = new Question('how do we add a class attribute to a HTML element?', 'class="className"', 'id="className"', 'src="className"', 'href="className"', 'class="className"')
var q4 = new Question('what is one benifit of the alt attribute?', 'creates a new tag', 'lets the developer link to an image', 'sets text in place of a broken image link', 'adds styles to the tag', 'sets text in place of a broken image link')

// add questions to array
questionArray.push(q1, q2, q3, q4)

// track question count
var questionCount = 1

// add event to submitButton
document.getElementById("startQuizBtn").addEventListener("click", startQuiz, false)

// find elements so we can determine if a user has selected an answer
function findEl(e) {
	// store event
	e = e || window.event;
	// store user selected element
    var target = e.target

    // select elements with class="choosen"
    var choosen = document.getElementsByClassName('choosen')

    // if there are no elements with class="choosen"
    if(choosen.length == 0) {
    	// update the target's  class name
    	target.className = 'choosen wrapper'
    // otherwise choosen has elements
    } else {
    	// update previous choosen item to remove class
    	choosen[0].className = 'wrapper'
    	// update the new target's class 
    	target.className = 'choosen wrapper'
    }
}

// question construction
function Question(question, answer1, answer2, answer3, answer4, correct) {
	this.question = question
	this.answer1  = answer1
	this.answer2  = answer2
	this.answer3  = answer3
	this.answer4  = answer4
	this.correct  = correct
}

// start quiz / continue quiz
function startQuiz() {
	// find / store elements with class="newForm"
	var x = document.getElementsByClassName('newForm')

	// loop through elements with class="newForm"
	for(var i = 0; i < x.length; i++) {
		// if there are no elements with class="newForm"
		if(!x.length == 0) {
	    	// hide form if user submmits answer by changing class on tag
	    	x[i].className = 'answered'
	    	
	    }
	}
	 
	// as long as we still have questions, based of question count and available questions
	while(questionCount < questionArray.length + 1) {
		// run generateQuestion function with next question
		generateQuestion(questionArray[questionCount - 1])
		// increase question count
		questionCount++
		// stop function so user can answer next questions
		return
	}

	// end quiz when out of questions
	endQuiz()
}

// end quiz
function endQuiz(userAnswers) {
	// create new element
	var newDiv = document.createElement('div')
	

	// store total of correct answers
	var total = 0
	// loop through usersAnswers
	for(var i = 0; i < usersAnswers.length; i++) {
		// if user answer matches question answer
		if(usersAnswers[i] == questionArray[i].correct) {
			// increase total correct
			total++
		}
	}

	// hide question display div
	document.getElementById('questionDisplay').style.display = 'none'

	
	// create percentage based on total / length of total correct answers
	var perc = total / usersAnswers.length * 100
	// create text node to store total questions answered
	var newText = document.createTextNode('questions answered correctly: ' + total + '/' + usersAnswers.length + " you scored a " + perc + "%")
	// aadd text to new element
	newDiv.appendChild(newText)
	// add question to question display
	document.getElementById('resultsDisplay').appendChild(newDiv)
	// display results
	document.getElementById('resultsDisplay').style.display = 'block'


}

// check user answer
function checkAnswers(questions, correct) {
	// store choosen element to get value from
	var userAnswer = document.getElementsByClassName('choosen')

	// check if there is a selected answer
	if(userAnswer[0] == undefined) {
		alert('choose an answer to submit')
		return
	// otherwise check if the user answer matches the correct answer
	}else if(userAnswer[0].innerText == correct) {
		// update class if correct
		userAnswer[0].className = 'wrapper success'
		// add answer to user answers
		usersAnswers.push(correct)
	// otherwise the answer is not correct
	} else {
		// add answer to user answers
		usersAnswers.push(userAnswer[0].innerText)
		// update class if correct
		userAnswer[0].className = 'wrapper incorrect'
	}

	// alert correct or incorrect to quiz taker
	//

	// move on to next question
	setTimeout(function(){ startQuiz() }, 1000)
}

// create questions
function generateQuestion(question) {
	// create question div and textnode
	var newDivQuestion = document.createElement('div')
	var questionText = document.createTextNode('Question: ' + question.question)
	
	// add text node to question div
	newDivQuestion.appendChild(questionText)

	// add question to question display
	var questionDisplay = document.getElementById('questionDisplay')

	// create form for new question
	var newForm = document.createElement('form')
	
	// set attribute of new form
	newForm.setAttribute('class', 'newForm')

	// create questions array from question object passed into function
	var questions = [question.answer1, question.answer2, question.answer3, question.answer4]
	// create variable to store correct answer
	var correct = question.correct

	// add question to form
	newForm.appendChild(newDivQuestion)
	
	// loop through questions to make new elements
	for(var i = 0; i < questions.length; i++){
		var newDivAnswer = document.createElement('div')
		// get answer text
		var answerText = document.createTextNode(questions[i])

		// set attributes for new answer div
		newDivAnswer.setAttribute('class', 'wrapper')

		// add event listener to get element selected
		newDivAnswer.addEventListener('click', function(e) {
		    findEl(e)
		}, false);

		// add text to new answer div
		newDivAnswer.appendChild(answerText)
		// add new answer div to form
		newForm.appendChild(newDivAnswer)
	}

	// hide starting form
	document.getElementById('mainForm').style.display = 'none'
	// display question form
	document.getElementById('questionDisplay').style.display = 'block'

	// create button to submitand add to form
	var newBtn = document.createElement('button')
	// add text to button
	var newBtnText = document.createTextNode('Submit Answer')
	// add text to button
	newBtn.appendChild(newBtnText)
	// set attributes for new button
	newBtn.setAttribute('class', 'btn btn-primary')
	newBtn.setAttribute('type', 'button')

	newBtn.addEventListener("click", function(){
		checkAnswers(questions, correct)
	}, false)

	// add button to form
	newForm.appendChild(newBtn)	

	// add newForm to questionDisplay
	questionDisplay.appendChild(newForm)	
}

