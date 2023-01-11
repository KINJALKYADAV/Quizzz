import React, { useState } from 'react';
import Timer from './Timer'
import Register from './Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
	const questions = [
		{
			questionText: 'Who is the Fourth Hokage?',
			answerOptions: [
				{ answerText: 'Jiraya', isCorrect: false },
				{ answerText: 'Tsunade', isCorrect: false },
				{ answerText: 'Kushina', isCorrect: false },
				{ answerText: 'Minato', isCorrect: true },
			],
		},
		{
			questionText: 'Who killed Jiraya?',
			answerOptions: [
				{ answerText: 'Itachi', isCorrect: false },
				{ answerText: 'Mask Man', isCorrect: false },
				{ answerText: 'Pain', isCorrect: true },
				{ answerText: 'Madara Uchiha', isCorrect: false },
			],
		},
		{
			questionText: 'Who is the Seventh Hokage?',
			answerOptions: [
				{ answerText: 'Naruto', isCorrect: true },
				{ answerText: 'Kakashi', isCorrect: false },
				{ answerText: 'Sasuke', isCorrect: false },
				{ answerText: 'Kabuto', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [recordedScore, setRecordedScore]= useState(0);
    const resetStateClick= () =>{
        setCurrentQuestion(0)
        setRecordedScore(score)
        setShowScore(false)
        setScore(0)
    }
	const [player, setplayer] = useState(false);
	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score+5);
			toast.success('Correct Answer !!', {theme:"colored"});
		}
		else {
			setScore(score-1);
			toast.error('Wrong Answer !',{theme: "colored"})
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} 
		else {
			setShowScore(true);
		}
	};
	const handlePrev =() => {
		setCurrentQuestion(currentQuestion-1);
	}
	const handleNext =() => {
		setCurrentQuestion(currentQuestion+1);
	}
	return (
		<>
		{/* <Register/> */}
		<div className='app'>
			
			{showScore ? (
				<div className='score-section'>
					<p>
					You scored {score} out of {questions.length}<br></br>
                    Your Last Score: {recordedScore}
					</p>
					<div className='retry-button'>
                    <button onClick={resetStateClick}>RETRY</button>
                    </div>
					
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
					<div className='Previous-button'>
                    <button onClick={handlePrev}>Previous</button>
                    </div>
					<div className='Next-button'>
                    <button onClick={handleNext}>Skip</button>
                    </div>
					<div className='timer'>Time Left : <Timer setShowScore={setShowScore} /> seconds</div>
                   
				</>
			)}
		</div>
		<ToastContainer />
		</>
	);
}