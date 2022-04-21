/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import AddForm from './AddForm';
import ListItem from './ListItem';
import List from './List';

const initQuestions = {
  question: 'ask something here ??????',
  answers: [{ answer: 'answer 1', status: 'active' }],
  status: 'active',
  correctAnswers: ['A..........', 'B..........']
};

// thêm câu hỏi: để rỗng
// thêm đáp án: +
// xóa đáp án:
// sửa đáp án
// submit

const CreateQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Array<any>>([initQuestions]);

  const handleAddQuestion = (value: string) => {
    setQuestions((state: any) => [...state, { question: value, answers: [], status: 'active' }]);
  };

  const handleDeleteQuestion = (key: number) => {
    const questionsDelete = [...questions];
    questionsDelete[key] = null;

    setQuestions(questionsDelete);
  };

  const handleUpdateQuestion = (key: number) => {
    const questionsEdit = [...questions];
    questionsEdit[key]['status'] = 'editing';

    setQuestions(questionsEdit);
  };

  const handleSaveQuestion = (key: number, item: string) => {
    const questionsSave = [...questions];
    questionsSave[key] = {
      ...questions[key],
      question: item,
      status: 'active'
    };

    setQuestions(questionsSave);
  };

  const handleAddAnswer = (answer: string, key: number) => {
    const questionAdd = [...questions];
    questionAdd[key]['answers'] = [...questions[key]['answers'], { answer, status: 'active' }];

    setQuestions(questionAdd);
  };

  const handleUpdateAnswer = (indexAnswer: number, indexParent: number) => {
    const questionUpdate = [...questions];
    const answersUpdate = [...questionUpdate[indexParent].answers];

    console.log('answersUpdate...', answersUpdate);

    answersUpdate[indexAnswer]['status'] = 'editing';

    questionUpdate[indexParent]['answers'][indexAnswer] = answersUpdate[indexAnswer];

    setQuestions([...questionUpdate]);
  };

  const handleDeleteAnswer = (indexAnswer: number, indexParent: number) => {
    const questionDelete = [...questions];
    const answersDelete = [...questionDelete[indexParent].answers];
    answersDelete[indexAnswer] = null;

    questionDelete[indexParent].answers[indexAnswer] = answersDelete;

    setQuestions(questionDelete);
  };

  const handleSaveAnswer = (indexAnswer: number, value: string, indexParent: number) => {
    const questionSave = [...questions];
    const answersSave = [...questionSave[indexParent].answers];

    answersSave[indexAnswer] = {
      answer: value,
      status: 'active'
    };

    questionSave[indexParent].answers[indexAnswer] = answersSave[indexAnswer];

    setQuestions([...questionSave]);
  };

  return (
    <>
      <div className={'flex flex-col items-center border border-2 border-[black] rounded-3xl p-16'}>
        <Grid container>
          <Grid item xs={12}>
            <AddForm addValue={handleAddQuestion} />
          </Grid>
          <Grid xs={12}>
            <List
              questions={questions}
              deleteItem={handleDeleteQuestion}
              updateItem={handleUpdateQuestion}
              saveItem={handleSaveQuestion}
              addAnswer={handleAddAnswer}
              deleteAnswer={handleDeleteAnswer}
              updateAnswer={handleUpdateAnswer}
              saveAnswer={handleSaveAnswer}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CreateQuestions;
