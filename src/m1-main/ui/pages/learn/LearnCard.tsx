import React, { useState } from "react";
// import {cardsType} from "../../../m2-bll/cardsReducer"
import { useNavigate } from "react-router-dom";
// import SuperRadio from "../../../m1-ui/common/c4-SuperRadio/SuperRadio"
import s from "./Learn.module.css";
import { CardsType } from "m1-main/dal/cards-api";
import SuperButton from "m1-main/ui/common/button/SuperButton";

type GradeType = 0 | 1 | 2 | 3 | 4 | 5;
type LearnRadioValueType = {
  question: string;
  grade: GradeType;
  selected: 0 | 1;
};
export type QuestionRateType = {
  card_id: string;
  grade: GradeType;
};
type LearnCardType = {
  currentCard: CardsType;
  changeCard: (questionRate: QuestionRateType) => void;
};
const workButtonStyle = {
  color: "white",
  width: "400px",
  height: "30px",
  fontWeight: "500",
  border: "none",
  background: "#678EFE",
};
const waitButtonStyle = {
  fontWeight: "500",
  width: "400px",
  height: "30px",
  border: "none",
};
export const LearnCard = ({ currentCard, changeCard }: LearnCardType) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const initualRadioValues: LearnRadioValueType[] = [
    { question: "Did not know", grade: 1, selected: 0 },
    { question: "Forgot", grade: 2, selected: 0 },
    { question: "A lot of thought", grade: 3, selected: 0 },
    { question: "Confused", grade: 4, selected: 0 },
    { question: "Knew the answer", grade: 5, selected: 0 },
  ];
  const [option, setOption] =
    useState<LearnRadioValueType[]>(initualRadioValues);
  const [questionRate, setQuestionRate] = useState<QuestionRateType>({
    card_id: "",
    grade: 0,
  });
  const checkAnswer = (i: number) => {
    currentCard._id &&
      setQuestionRate({
        card_id: currentCard._id,
        grade: (i + 1) as GradeType,
      });
    const newRadioValues: LearnRadioValueType[] = initualRadioValues.map(
      (item, index) => {
        return index === i
          ? { ...item, selected: 1 }
          : { ...item, selected: 0 };
      }
    );
    setOption(newRadioValues);
  };
  const onShowAnswerHandler = () => {
    setShowAnswer(true);
  };
  const onNextHandler = () => {
    if (questionRate.grade) {
      setShowAnswer(false);
      setOption(initualRadioValues);
      changeCard(questionRate);
      setQuestionRate({ card_id: "", grade: 0 });
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.question_wrapper}>
        <div className={s.wrapper_text}>
          <span>Question:</span>
          <p className={s.headerText}>{currentCard.question}</p>
        </div>
        <div
          className={s.shots}
        >{`Количество попыток ответов на вопрос: ${currentCard.shots}`}</div>
      </div>

      {showAnswer && (
        <div className={s.wrapper_button}>
          <div className={s.wrapper_text}>
            <span>Answer:</span>
            <p className={s.headerText}>{currentCard.answer}</p>
          </div>
          <span className={s.rateHeader}>Rate yourself:</span>
          {option.map((el, i) => {
            return (
              <span className={s.rate} key={el.grade}>
                <input
                  type={"radio"}
                  value={el.selected}
                  checked={!!el.selected}
                  className={s.rate}
                  onChange={() => checkAnswer(i)}
                />
                <span onClick={() => checkAnswer(i)}>{el.question}</span>
              </span>
            );
          })}
        </div>
      )}
      <SuperButton
        onClick={showAnswer ? onNextHandler : onShowAnswerHandler}
        dis={true}
        style={
          questionRate.grade || !showAnswer ? workButtonStyle : waitButtonStyle
        }
      >
        {showAnswer ? "Next" : "Show answer"}
      </SuperButton>
    </div>
  );
};
