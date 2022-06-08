function getTextAccordingToCursorPosition(inputValue, selectionStart, mergeWithInputValue) {
  const textBeforeCursorPosition = inputValue.substring(0, selectionStart);
  const textAfterCursorPosition = inputValue.substring(
    selectionStart,
    inputValue.length
  );
  const value =
    textBeforeCursorPosition + mergeWithInputValue + textAfterCursorPosition;
  return value;
}

export { getTextAccordingToCursorPosition };
