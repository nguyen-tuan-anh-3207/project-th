import { Grid, IconButton, Input, Paper } from '@mui/material';
import React, { useRef } from 'react';
import { Save } from '@mui/icons-material';

type Props = {
  index: number;
  item: any;
  save: any;
};

const styles = {
  Icon: {
    marginLeft: 'auto',
    width: '10%'
  },
  Paper: {
    margin: 'auto',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 500
  }
};

const ListItemEdit = (props: Props) => {
  const inputRef = useRef<any>();
  return (
    <Grid xs={12} item key={props.index}>
      <Paper elevation={2} style={styles.Paper}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.save(props.index, inputRef.current.value);
          }}
          style={{ display: 'flex' }}
        >
          <Input style={{ width: '90%' }} defaultValue={props.item} inputRef={inputRef} />
          <IconButton type="submit" color="primary" aria-label="Add" style={styles.Icon}>
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Grid>
  );
};

export default ListItemEdit;
