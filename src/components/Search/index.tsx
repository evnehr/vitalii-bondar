import React from 'react';
import {TextField} from "@material-ui/core";

interface SearchProps {

}

const Search = (props: SearchProps) => {
  return (
    <TextField
      variant={"outlined"}
      size={"small"}
      type={'search'}
      placeholder={'Search'}/>
  );
};

export default Search;