export const capatalizeFirstLetterOfEachWordInAphrase=(text: string)=>{
    return text.replace(/(^\w{1})|(\s+\w{1})/g,letter=>letter.toUpperCase())
}
export const capitalizeFirstLetterOfAWord =(text:string)=>{
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}