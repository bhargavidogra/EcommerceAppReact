import React from "react";
import {articalcontent} from './Artical-Content';
import {ArticalsPage} from '../components/ArticalsPage';
import {NotFoundPage} from './NotFoundPage';

export const ArticalPage = ({match}) =>{
const name = match.params.name;
const artical =  articalcontent.find(artical=>artical.bookName === name);
const articallist = articalcontent.filter(artical=>artical.bookName!==name);
if(!artical) return <NotFoundPage/>
return (
  <>
    <h1>{artical.bookName}</h1>
<p>{artical.aptNotes}</p>
<br/>
<h3>Other Artical's List</h3>
<ArticalsPage articals = {articallist} />
  </>
)};