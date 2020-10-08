import React from "react";
import {articalcontent} from './Artical-Content';
import {ArticalsPage} from '../components/ArticalsPage';

export const ArticalsListView = () =>{

return(
  <>
    <h1>Artical's List!</h1>
    <ArticalsPage articals ={articalcontent}/>
  </>
)};
