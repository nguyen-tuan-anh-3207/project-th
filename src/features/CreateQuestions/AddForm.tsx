import { Button, Input } from '@mui/material';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import React, { ChangeEvent, useRef } from 'react';

type Props = {
  addValue: any;
};

const AddForm = (props: Props) => {
  const { addValue } = props;
  const inputRef = useRef<any>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef.current.value) {
      addValue(inputRef.current.value);
      e.currentTarget.reset();
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <Input
        inputProps={{
          'aria-label': 'Description'
        }}
        inputRef={inputRef}
        style={{ width: '90%' }}
      />

      <Button type="submit" variant="contained" color="primary" style={{ width: '10%' }}>
        Add
      </Button>
    </form>
  );
};

export default AddForm;
