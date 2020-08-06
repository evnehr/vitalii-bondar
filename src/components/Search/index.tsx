import React, {useContext} from 'react';
import {TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import {ContextApp} from "../../state/reducer";
import {actions} from "../../state/actions";

interface SearchProps {

}

const Search = (props: SearchProps) => {


    const {dispatch} = useContext(ContextApp);

    const onChangeInput = (e:any):void =>{
        dispatch(actions.changeTaskFilter(e.currentTarget.value))
    }

    return (
        <>
            <TextField
                variant={'outlined'}
                size={'small'}
                type={'search'}
                placeholder={'Search'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon  color='action'/>
                        </InputAdornment>
                    ),
                }}
                onChange={onChangeInput}
            />
        </>
    );
};

export default Search;