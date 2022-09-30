import React, {useState} from "react";
import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";


const AddingPage = () => {
    console.log('Adding page render!')
    const [rus, setRus] = useState('');
    const [eng, setEng] = useState('');

    const words = useAppSelector(state => state.wordReducer.words)
    const dispatch = useAppDispatch();
    const {addWord} = wordSlice.actions
    const handleChangeRus = (event: React.FormEvent<HTMLInputElement>) => {
        setRus(event.currentTarget.value)
    }
    const handleChangeEng = (event: React.FormEvent<HTMLInputElement>) => {
        setEng(event.currentTarget.value)
    }
    const isDisabled = () => {
        return !rus.length || !eng.length;
    }
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
         if(!words.find(word => word.eng.toLowerCase() === eng.toLowerCase())){
             dispatch(addWord({
                 id: Date.now(),
                 rus,
                 eng
             }))
             setRus('')
             setEng('')
         } else {
             alert(`the word: ${eng} already exists in the dictionary`)
             setRus('')
             setEng('')
         }

            }
return (
    <>
        <form className={classes.addingPage__form}>
            <input  maxLength={20} type='text' value={rus} onChange={event => {
                handleChangeRus(event)
            }} placeholder='insert russian word'/>
            <input maxLength={20} type='text' value={eng} onChange={event => handleChangeEng(event)}
                   placeholder='insert english translate'/>
            <button onClick={handleSubmit} disabled={isDisabled()}>Add words!</button>
        </form>
    </>
)
}
export default AddingPage