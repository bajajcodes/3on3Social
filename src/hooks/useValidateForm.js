function useValidateForm({ formErrorMessage, SetFormErrorMessage }) {
  function isFormEntryCorrect(value) {
    if (value.length === 0 || value.trim().length === 0) {
      return false;
    }
    return true;
  }

  function validateForm(event) {
    const body = {};
    if (formErrorMessage !== "") {
      SetFormErrorMessage("");
    }
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      for (let [k, v] of formData.entries()) {
        if (isFormEntryCorrect(v)) {
          body[k] = v;
        } else {
          throw new Error(`${k} value: ${v} is not correct`);
        }
      }
      return body;
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  return { validateForm };
}

export { useValidateForm };
