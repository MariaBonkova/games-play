import {useState} from "react";
//в този хук правя копие на стойностите на стейта и ми връща мой wrap-ната функция и ще го ползваме за
// аутентикейшън
export const useLocalStorage = (key,defaultValue) => {

    const [value, setValue] = useState(()=>{
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setLocalStorageValue =(newValue)=>{
        localStorage.setItem(key,JSON.stringify(newValue));
        setValue(newValue);

    }
    return [
        value,
        setLocalStorageValue,
    ]
}