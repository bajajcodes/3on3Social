function getDate(info) {
  try {
    if (info?.createdAt) {
      const createdAt = info.createdAt.toDate();
      return JSON.stringify(createdAt);
    }
    return "";
  } catch (error) {
    //* This log is info describing old accounts created using Date object
    console.log(error.message);
    return info?.createdAt ?? "Date NA";
  }
}

function parseDateToDMY(createdAt) {
  try {
    if (createdAt) {
      const date = new Date(JSON.parse(createdAt));
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return "";
  } catch (error) {
    //* This log is info describing old accounts created using Date object
    console.log(error.message);
    return createdAt ?? "Date NA";
  }
}

export { getDate, parseDateToDMY };
