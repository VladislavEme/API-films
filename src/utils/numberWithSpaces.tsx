const numberWithSpaces = (num: string | number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default numberWithSpaces;
