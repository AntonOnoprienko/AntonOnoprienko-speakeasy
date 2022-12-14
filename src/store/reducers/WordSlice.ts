import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IResult, IWord} from "../../models/IWords";

interface WordsState {
    words: IWord[];
    tempWords: IWord[];
    playerResults:IResult[]
    isLoading: boolean
    error: string
    count: number
    winRate: number
    playerName: string
    wrongAnswers: string[]
}

const initialState: WordsState = {
    words: [
        {
            id: 1,
            rus: 'уменьшать',
            eng: 'abate'
        },
        {
            id: 2,
            rus: 'отказываться',
            eng: 'abjure'
        },
        {
            id: 3,
            rus: 'предсказание',
            eng: 'augury'
        },
        {
            id: 4,
            rus: 'алчный',
            eng: 'avaricious'
        },
        {
            id: 5,
            rus: 'уговаривание',
            eng: 'blandishment'
        },
        {
            id: 6,
            rus: 'грубиян',
            eng: 'boor'
        },
        {
            id: 7,
            rus: 'уставной',
            eng: 'canonical'
        },
        {
            id: 8,
            rus: 'бутылка',
            eng: 'bottle'
        },
        {
            id: 9,
            rus: 'Соответственный',
            eng: 'commensurate'

        },
        {
            id: 10,
            rus: 'виновность',
            eng: 'culpability'
        },
        {
            id: 11,
            rus: 'чашка',
            eng: 'cup'
        },
        {
            id: 12,
            rus: 'ручка',
            eng: 'pen'
        },
        {
            id: 13,
            rus: 'карандаш',
            eng: 'pencil'
        },
        {
            id: 14,
            rus: 'чай',
            eng: 'tea'
        },
        {
            id: 15,
            rus: 'окно',
            eng: 'window'
        },
        {
            id: 16,
            rus: 'мальчик',
            eng: 'boy'
        },
        {
            id: 17,
            rus: 'дорога',
            eng: 'road'
        },
        {
            id: 18,
            rus: 'море',
            eng: 'sea'
        },
        {
            id: 19,
            rus: 'небо',
            eng: 'sky'
        },
        {
            id: 20,
            rus: 'облако',
            eng: 'cloud'
        },
        {
            id: 21,
            rus: 'яблоко',
            eng: 'apple'
        },
        {
            id: 22,
            rus: 'пол',
            eng: 'flor'
        },
        {
            id: 23,
            rus: 'радостный',
            eng: 'happy'
        },
        {
            id: 24,
            rus: 'свет',
            eng: 'light'
        },

        {
            id: 25,
            rus: 'столица',
            eng: 'capital'
        },{
            id: 26,
            rus: 'большой',
            eng: 'big'
        },
        {
            id: 27,
            rus: 'сад',
            eng: 'garden'
        },
        {
            id: 28,
            rus: 'лампа',
            eng: 'lamp'
        },
        {
            id: 29,
            rus: 'холодильник',
            eng: 'fridge'
        },{
            id: 30,
            rus: 'рыба',
            eng: 'fish'
        },
        {
            id: 31,
            rus: 'охотник',
            eng: 'hunter'
        },
        {
            id: 32,
            rus: 'певец',
            eng: 'singer'
        },
        {
            id: 33,
            rus: 'сообщение',
            eng: 'message'
        },


    ],
    tempWords: [],
    playerResults:[],
    isLoading: false,
    error: '',
    count: 1,
    winRate: 0,
    playerName: '',
    wrongAnswers:[]
}

export const wordSlice = createSlice({
    name: 'word',
    initialState,
    reducers: {
        //Добавляет новое слово
        addWord(state, action: PayloadAction<IWord>) {
            state.words.push(action.payload);
        },
        //Увеличивает счетчик
        increment(state,action:PayloadAction<number>){
            state.count += action.payload;
        },
        //Увеличивает % правильных ответов
        winRateInc(state,action:PayloadAction<number>){
            state.winRate += action.payload;
        },
        //Обновляет результаты
        refreshResults(state){
            state.winRate = 0;
            state.count = 1;
            state.playerName = '';
        },
        //Добавляет имя
        setName(state,action:PayloadAction<string>){
           state.playerName = action.payload;
        },
        //Добавляет результаты
        addResult(state,action:PayloadAction<IResult>){
            state.playerResults.push(action.payload);
            state.winRate = 0;
            state.count = 1;
            state.wrongAnswers = [];
        },
        //Добавляет неправильные ответы
        setWrongAnswers(state,action:PayloadAction<string>){
            state.wrongAnswers.push(action.payload)
        },
        //Удаляет отгаданое слоово из копии массива словаря
        removeWord(state,action:PayloadAction<number>){
            state.tempWords = state.tempWords.filter(w => w.id !== action.payload)
        },
        //Обновляет копия словаря после ввода имени
        createTempState(state){
            state.tempWords = state.words
        },
    }
})

export default wordSlice.reducer;