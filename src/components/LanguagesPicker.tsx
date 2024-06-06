import { Avatar, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { LangugeArray } from '../constants/languages';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguageReducer } from '../store/language/language';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { RootState } from '../store/store';
const LanguagePicker: React.FC = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state: RootState)=> state.language);
    return <Grid style={{ display: 'flex', justifyContent: 'right', textAlign: 'center' , flexGrow: 1}}>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        style={{flexDirection: 'row'}}
        onChange = {(event: React.ChangeEvent<HTMLInputElement>)=>{
            dispatch(setLanguageReducer(event.target.value))
        }}
        >
            { LangugeArray.map((language, i) => {
                return <FormControlLabel 
                key = {i}
                checked = {currentLanguage === language}
                value = {language} 
                control = {<Radio  style = {{display: "none"}}/>} 
                label = {
                    <Avatar 
                    variant="rounded" 
                    sx={{ 
                        width: 24, 
                        height: 24, 
                        bgcolor: currentLanguage === language ? deepPurple[700] : deepOrange[700], 
                        fontSize: '0.65rem' }}
                    >
                        { language }
                    </Avatar>
                    }
                />
                }
        )}
        </RadioGroup>
    </Grid>
}

export default LanguagePicker;