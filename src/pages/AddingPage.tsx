import React, {useState} from "react";
import classes from "./pages.module.css";
import {useAppDispatch} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";


const AddingPage = () => {
    console.log('Adding page render!')
    const [rus, setRus] = useState('');
    const [eng, setEng] = useState('');

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
        dispatch(addWord({
            id: Date.now(),
            rus,
            eng
        }))
        setRus('')
        setEng('')
    }
    return (
        <>
            <form className={classes.addingPage__form}>
                <input type='text' value={rus} onChange={event => {
                    handleChangeRus(event)
                }} placeholder='insert russian word'/>
                <input type='text' value={eng} onChange={event => handleChangeEng(event)}
                       placeholder='insert english translate'/>
                <button onClick={handleSubmit} disabled={isDisabled()}>Add words!</button>
            </form>
        </>
    )
}
export default AddingPage