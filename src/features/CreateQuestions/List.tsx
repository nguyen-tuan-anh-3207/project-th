import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import ListItem from './ListItem';
import ListItemEdit from './ListItemEdit';
import AddForm from './AddForm';

type Props = {
  questions: any;
  deleteItem: any;
  updateItem: any;
  saveItem: any;
  addAnswer: any;
  updateAnswer?: any;
  saveAnswer?: any;
  deleteAnswer?: any;
};

const List = (props: Props) => {
  const { questions, deleteItem, updateItem, saveItem, addAnswer, deleteAnswer, saveAnswer, updateAnswer } = props;
  const renderListAnswer = (answers: any, key: number, indexParent: number) => {
    if (answers[key] === null) {
      return null;
    }

    if (answers[key]['status'] === 'active') {
      return (
        <ListItem
          key={key}
          index={key}
          item={answers[key]['answer']}
          delete={(indexAnswer: any) => deleteAnswer(indexAnswer, indexParent)}
          update={(indexAnswer: any) => updateAnswer(indexAnswer, indexParent)}
        />
      );
    }

    if (answers[key]['status'] === 'editing') {
      return (
        <ListItemEdit
          index={key}
          key={key}
          save={(indexAnswer: number, value: string) => saveAnswer(indexAnswer, value, indexParent)}
          item={answers[key]['answer']}
        />
      );
    }
  };
  const renderList = (item: any, key: number) => {
    if (questions[key] === null) {
      return null;
    }

    return (
      <Grid item xs={12}>
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            {questions[key]['status'] === 'active' ? (
              <ListItem
                key={key}
                index={key}
                item={questions[key]['question']}
                delete={deleteItem}
                update={updateItem}
              />
            ) : (
              <ListItemEdit index={key} key={key} save={saveItem} item={questions[key]['question']} />
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <AddForm addValue={(value: string) => addAnswer(value, key)} />
              {item?.answers.map((ele: any, index: number) => renderListAnswer(item.answers, index, key))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };
  return <Grid container>{questions.map((item: any, index: number) => renderList(item, index))}</Grid>;
};

export default List;
