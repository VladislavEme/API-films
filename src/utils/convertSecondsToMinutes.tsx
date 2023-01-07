const convertSecondsToMinutes = (sec: string | number) => `${Math.floor(+sec / 60)} min / ${new Date(+sec * 1000).toISOString().substr(11, 5)}`;

export default convertSecondsToMinutes;
