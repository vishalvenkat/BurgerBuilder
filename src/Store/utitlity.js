export const update = (prevState, curState) => {
    return {
        ...prevState,
        ...curState
    }
}