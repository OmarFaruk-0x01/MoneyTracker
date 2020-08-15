import React from 'react'
import AddBtns from './AddBtns';
import BCStyle from './Styles/BtnContainer.module.css'
function BtnContainer() {
    return (
        <div className={BCStyle.container}>
            <AddBtns type={'inc'}/>
            <AddBtns type={'exp'}/>
        </div>
    )
}

export default BtnContainer
