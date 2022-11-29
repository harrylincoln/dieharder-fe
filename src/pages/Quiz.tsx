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
    transition: background-color 50ms linear;
    label {
      cursor: pointer;
    }
    input {
      margin-right: 0.5rem;
      height: 1rem;
      width: 1rem;
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

const ScoreTable = styled.table`
  background-color: #0f0f12;
  text-align: left;
  font-size: 1.2rem;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  padding: 1rem;
  border-spacing: 0px;
  border-collapse: separate;
  border: 18px solid black;
  margin: 0 auto;
  border-right-color: white;
  border-top-color: white;
  border-left-color: #506c83;
  border-bottom-color: #506c83;
  font-family: monospace;
  td {
    padding-left: 0.25rem;
  }
`;

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
        "https://c0tkci3lhc.execute-api.eu-west-2.amazonaws.com/production/api/questionset/create",
        { uuid }
      );
      localStorage.setItem("client_request_id", resp.data.client_request_id);
      localStorage.setItem("set_id", resp.data.set_id);
      setQuizQuestions(resp.data.questions);
      // setQuizQuestions(mockResp.questions);
    };
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const changedQuestionId = Number(id.split("-")[0]);
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
    // Must submit in order questions were given
    const sortedQuestions = quizQuestions
      ?.map((initialQuestion: Question) => initialQuestion.questionId)
      .reduce((acc: AnsweredQuestion[], questionId: number) => {
        const questionToPush = answeredQuestions.find(
          (answeredQuestion) => answeredQuestion.question_id === questionId
        ) as AnsweredQuestion;
        acc.push(questionToPush);
        return acc;
      }, []);

    try {
      const results = await axios.post(
        "https://c0tkci3lhc.execute-api.eu-west-2.amazonaws.com/production/api/questionset/submit",
        {
          questions: sortedQuestions,
          set_id: localStorage.getItem("set_id"),
          client_request_id: localStorage.getItem("client_request_id"),
        }
      );
      window.scrollTo({ top: 0 });
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
          <ScoreTable>
            <tr>
              <th></th>
              <th></th>
              <th>SCORE</th>
            </tr>

            <tr>
              <td>
                ABASCAL
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                F
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                28<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                ALLEN
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td style={{ transform: "rotate(3deg)" }}>
                W
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                34<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                ATKEN
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                T
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                0<span style={{ color: "black" }}>&#8226;&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>&nbsp;</td>
            </tr>
            <tr>
              <td>
                BLAZE
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                <span
                  style={{
                    transform: "rotate(-12deg)",
                    display: "inline-block",
                  }}
                >
                  W
                </span>
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                27<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                BRICK
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                J
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                27<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                BRUNER
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                W
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                3
                <span
                  style={{
                    transform: "rotate(-18deg)",
                    display: "inline-block",
                  }}
                >
                  4
                </span>
                <span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                BORIS
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                R
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                31<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>&nbsp;</td>
            </tr>
            <tr>
              <td>
                CAMPBELL
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                S
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                14<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                CLAY
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                WM
                <span style={{ color: "black" }}>&#8226;&#8226;&#8226;</span>
              </td>
              <td>
                2
                <span
                  style={{
                    transform: "rotate(-18deg)",
                    display: "inline-block",
                  }}
                >
                  9
                </span>
                <span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                CRAWFORD
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                L
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                30<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>&nbsp;</td>
            </tr>
            <tr>
              <td>
                <span
                  style={{
                    transform: "rotate(13deg)",
                    display: "inline-block",
                  }}
                >
                  D
                </span>
                EGOVIA
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                O
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                29<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                DESOUZA
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                C
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                31<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                DEBONT
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                J
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                31<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                DISARRO
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                A
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                30<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td>
                DURRULL
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                B
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                31<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>&nbsp;</td>
            </tr>
            <tr>
              <td>
                ELLING
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                <span
                  style={{
                    transform: "rotate(13deg)",
                    display: "inline-block",
                  }}
                >
                  J
                </span>
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                30<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>&nbsp;</td>
            </tr>
            <tr style={{ color: "orange" }}>
              <td>
                PLAYER
                <span style={{ color: "black" }}>
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </span>
              </td>
              <td>
                ONE<span style={{ color: "black" }}>&#8226;&#8226;</span>
              </td>
              <td>
                {results.score}
                <span style={{ color: "black" }}>&#8226;</span>
              </td>
            </tr>
          </ScoreTable>
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
                  {question.potentialAnswers.map(
                    (answer: PotentialAnswer, idx: number) => (
                      <fieldset>
                        <label htmlFor={`${question.questionId}-${idx}`}>
                          <input
                            type="radio"
                            id={`${question.questionId}-${idx}`}
                            name={`${question.questionText}`}
                            value={answer.answerId}
                            onChange={onChangeAnswerSelect}
                          />
                          {answer.answerText}
                        </label>
                      </fieldset>
                    )
                  )}
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
