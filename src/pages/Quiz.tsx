import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import TouchScreenButton from "../components/TouchScreenButton";
// import mockResp from "../mock-questions.json";

const StyledFieldSets = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  align-items: stretch;

  fieldset {
    font-family: "BenchNine", sans-serif;
    padding: 0.25rem;
    border-width: 0.3rem;
    font-size: 1.5rem;
    min-width: 2rem;
    background: #364d59;
    color: #a2c8dd;
    border-right-color: white;
    border-top-color: white;
    border-left-color: #506c83;
    border-bottom-color: #506c83;
    margin: 0 0.25rem 0.25rem 0.25rem;
    cursor: pointer;
    transition: background-color 50ms linear;
    input {
      margin-right: 1rem;
      height: 1rem;
    }
  }
`;

const StyledQuestion = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
  }

  @media (min-width: 768px) {
    img {
      max-width: 60%;
    }
  }

  margin-bottom: 1rem;
`;

type PotentialAnswer = {
  answerText: string;
  answerId: number;
};

type Question = {
  questionId: number;
  questionType: number;
  questionText: string;
  potentialAnswers: PotentialAnswer[];
  image: string;
};

type AnsweredQuestion = {
  question_id: number;
  answer_id: number;
};

type Results = {
  message: string;
  score: string;
};

const Quiz = () => {
  const uuid = uuidv4();

  const [quizQuestions, setQuizQuestions] = useState<Question[] | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);
  const [finishedAnswering, setFinishedAnswering] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    const getQuiz = async () => {
      const resp = await axios.post(
        "http://localhost:3000/dev/api/questionset/create",
        { uuid }
      );
      localStorage.setItem("client_request_id", resp.data.client_request_id);
      localStorage.setItem("set_id", resp.data.set_id);
      setQuizQuestions(resp.data.questions);
      // setQuizQuestions(mockResp.questions);
    };
    getQuiz();
  }, []);

  useEffect(() => {
    console.log(answeredQuestions);
    if (
      quizQuestions &&
      answeredQuestions.length === quizQuestions.length &&
      !finishedAnswering
    ) {
      setFinishedAnswering(true);
      console.log("readyToSubmit");
    }
  }, [answeredQuestions, quizQuestions, finishedAnswering]);

  const onChangeAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    const changedQuestionId = Number(id);
    const changedAnswerId = Number(value);

    const answerState = {
      index: answeredQuestions.findIndex(
        (answer) => answer.question_id === changedQuestionId
      ),
      dirty: answeredQuestions.some(
        (answer) => answer.question_id === changedQuestionId
      ),
    };

    if (!answerState.dirty) {
      setAnsweredQuestions([
        ...answeredQuestions,
        {
          question_id: changedQuestionId,
          answer_id: changedAnswerId,
        },
      ]);
    } else {
      const newState = [...answeredQuestions] as AnsweredQuestion[];
      newState[answerState.index] = {
        question_id: changedQuestionId,
        answer_id: changedAnswerId,
      };
      setAnsweredQuestions(newState);
    }
  };

  const handleOnSubmit = async () => {
    try {
      const results = await axios.post(
        "http://localhost:3000/dev/api/questionset/submit",
        {
          questions: answeredQuestions,
          set_id: localStorage.getItem("set_id"),
          client_request_id: localStorage.getItem("client_request_id"),
        }
      );

      setResults(results.data);
    } catch (e) {
      console.log("ooops. No bullets. You think I'm fucking stoopid, Hans.", e);
    }
  };

  return (
    <>
      {results && (
        <>
          <h1>Results</h1>
          <h4>{results.score}</h4>
        </>
      )}

      {!results && (
        <>
          <h1>Quiz time</h1>
          {quizQuestions &&
            quizQuestions.map((question: Question, questionIndex: number) => (
              <StyledQuestion>
                <h2 style={{ color: "#ff6300" }}>#{questionIndex + 1}</h2>
                <picture>
                  <img src={`/${question.image}`} alt="Flowers" />
                </picture>
                <h4>{question.questionText}</h4>
                <StyledFieldSets>
                  {question.potentialAnswers.map((answer: PotentialAnswer) => (
                    <fieldset>
                      <input
                        type="radio"
                        id={`${question.questionId}`}
                        name={`${question.questionText}`}
                        value={answer.answerId}
                        onChange={onChangeAnswerSelect}
                      />
                      <label htmlFor={`${question.questionId}`}>
                        {answer.answerText}
                      </label>
                    </fieldset>
                  ))}
                </StyledFieldSets>
              </StyledQuestion>
            ))}
          {!quizQuestions && <>Loading...</>}
          {finishedAnswering && (
            <TouchScreenButton text={"Finished?"} onClick={handleOnSubmit} />
          )}
        </>
      )}
    </>
  );
};

export default Quiz;
