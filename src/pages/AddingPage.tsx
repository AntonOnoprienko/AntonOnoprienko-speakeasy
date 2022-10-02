import React, {useState} from "react";
import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";


const AddingPage = () => {
    const [rus, setRus] = useState('');
    const [eng, setEng] = useState('');
    const [isExist, setIsExist] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [lastWord,setLastWord] = useState('')

    const words = useAppSelector(state => state.wordReducer.words)
    const dispatch = useAppDispatch();
    const {addWord} = wordSlice.actions
    const handleChangeRus = (event: React.FormEvent<HTMLInputElement>) => {
        setIsSuccess(false);
        setIsExist(false);
        setRus(event.currentTarget.value)
    }
    const handleChangeEng = (event: React.FormEvent<HTMLInputElement>) => {
        setIsSuccess(false);
        setIsExist(false);
        setEng(event.currentTarget.value)
    }
    const isDisabled = () => {
        return !rus.length || !eng.length;
    }
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!words.find(word => word.eng.toLowerCase() === eng.toLowerCase())) {
            dispatch(addWord({
                id: Date.now(),
                rus,
                eng
            }))
            setLastWord(eng)
            setRus('')
            setEng('')
            setIsSuccess(true)
        } else {
            setLastWord(eng)
            setIsExist(true);
            setRus('');
            setEng('')
        }

    }
    return (
            <form className={classes.addingPage__form}>
                <label htmlFor={'eng'}>Insert english word</label>
                <input id='eng' maxLength={20} autoComplete={'off'} type='text' value={eng}
                       onChange={event => handleChangeEng(event)}/>

                <label htmlFor={'rus'}>Insert russian translate</label>
                <input id='rus' maxLength={20} autoComplete={'off'} type='text' value={rus}
                       onChange={event => handleChangeRus(event)}/>
                {isExist && <p className={classes.addingPage__error} onClick={()=>setIsExist(false)}>The word <span className={classes.addingPage__error_word}>{lastWord}</span> already exists in the dictionary.</p>}
                {isSuccess && <p className={classes.addingPage__success} onClick={()=>setIsSuccess(false)}>The word <span className={classes.addingPage__error_word}>{lastWord}</span> was successfully added to the dictionary.</p>}
                <button onClick={handleSubmit} disabled={isDisabled()}>ADD WORDS!</button>
            </form>
    )
}
export default AddingPage