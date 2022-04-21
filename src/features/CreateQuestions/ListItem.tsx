import { Grid, IconButton, Paper } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Delete, Build } from '@mui/icons-material';

type Props = {
  index: number;
  update: any;
  item: any;
  delete: any;
};
const styles = {
  Icon: {
    marginLeft: 'auto'
  },
  Paper: {
    margin: 'auto',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    width: 500
  },
  Todo: {}
};

const ListItem = (props: Props) => {
  const [fade, setFade] = useState<boolean>(false);
  const gridRef = useRef<any>();
  const gridClass = fade ? 'fade-out' : '';
  const deleteItem = () => {
    setFade(true);

    props.delete(props.index);
  };
  return (
    <Grid xs={12} className={`${gridClass}`} item key={props.index} ref={gridRef}>
      <Paper elevation={2} style={styles.Paper}>
        <span style={styles.Todo}>{props.item}</span>
        <IconButton color="primary" aria-label="Edit" style={styles.Icon} onClick={() => props.update(props.index)}>
          <Build fontSize="small" />
        </IconButton>
        <IconButton color="secondary" aria-label="Delete" onClick={deleteItem}>
          <Delete fontSize="small" />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default ListItem;
